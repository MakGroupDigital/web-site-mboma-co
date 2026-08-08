import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

assert.ok(process.env.FIRESTORE_EMULATOR_HOST, 'This test must run against the Firestore emulator.');

const [emulatorHost, emulatorPort] = process.env.FIRESTORE_EMULATOR_HOST.split(':');
const app = initializeApp({ projectId: 'studio-7989313016-fb1dd', apiKey: 'test-key', appId: 'test-app' });
const db = getFirestore(app);
connectFirestoreEmulator(db, emulatorHost, Number(emulatorPort));

const baseContact = {
  firstName: 'Test',
  lastName: 'Campagne',
  email: 'test-formulaire@example.com',
  phone: '+243000000000',
  referenceNumber: 'TEST-REFERENCE-001',
  submissionDate: '08/08/2026',
  status: 'new',
};

const submissions = [
  {
    name: 'Technology Partnership Program',
    collectionName: 'partnership_requests',
    payload: {
      ...baseContact,
      organisation: 'Organisation Test',
      organisationType: 'Entreprise',
      role: 'Responsable innovation',
      partnershipGoal: 'Co-développement technologique',
      projectStage: 'Concept défini',
      message: 'Demande isolée de validation du formulaire de partenariat.',
      campaign: 'Technology Partnership Program',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    name: 'Audit technologique',
    collectionName: 'audit_requests',
    payload: {
      ...baseContact,
      company: 'Entreprise Test',
      auditType: 'Audit technologique complet',
      message: 'Priorités : Infrastructure, Cybersécurité',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  ...[
    ['Digitalisez votre entreprise', 'digitalisez-votre-entreprise', ['Clients & CRM']],
    ['Vous avez une idée d’application ?', 'idee-application', ['Application mobile']],
    ['Automatisez vos tâches avec l’IA', 'automatisez-vos-taches-avec-ia', ['Service client']],
  ].map(([campaignName, campaignSlug, priorities], index) => ({
    name: campaignName,
    collectionName: 'campaign_requests',
    payload: {
      ...baseContact,
      referenceNumber: `TEST-CAMPAIGN-${index + 1}`,
      campaignName,
      campaignSlug,
      organisation: 'Entreprise Test',
      role: 'Responsable opérations',
      organisationSize: '11–50 personnes',
      objective: 'Gagner du temps',
      priorities,
      currentTools: 'Outils de test',
      message: 'Description suffisamment détaillée pour valider ce formulaire de campagne.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })),
];

for (const submission of submissions) {
  const result = await addDoc(collection(db, submission.collectionName), submission.payload);
  assert.ok(result.id, `${submission.name}: Firestore must return a document id.`);
  console.log(`PASS persistence: ${submission.name}`);
}

await assert.rejects(
  addDoc(collection(db, 'campaign_requests'), {
    campaignName: 'Invalid test',
    campaignSlug: 'invalid-test',
    firstName: 'Missing',
    lastName: 'Email',
    organisation: 'Test',
    referenceNumber: 'INVALID-001',
    status: 'new',
  }),
  /permission|PERMISSION_DENIED/i,
  'Firestore rules must reject an incomplete campaign request.',
);
console.log('PASS security: incomplete campaign request rejected');

const pageChecks = [
  ['TechnologyAuditCampaignPage.tsx', 'Priorités d’audit', 'La demande n’a pas pu être enregistrée'],
  ['DigitalizeBusinessPage.tsx', 'Processus à digitaliser', 'Le projet n’a pas pu être enregistré'],
  ['AppIdeaCampaignPage.tsx', 'Besoins identifiés', 'L’idée n’a pas pu être enregistrée'],
  ['AiAutomationCampaignPage.tsx', 'Tâches à automatiser', 'La demande n’a pas pu être enregistrée'],
];

for (const [fileName, counterLabel, technicalError] of pageChecks) {
  const source = await readFile(new URL(`../pages/${fileName}`, import.meta.url), 'utf8');
  assert.match(source, new RegExp(`${counterLabel}[^\\n]+form\\.priorities\\.length`), `${fileName}: selected count is visible.`);
  assert.ok(source.includes(technicalError), `${fileName}: technical errors are distinct from selection errors.`);
  console.log(`PASS validation feedback: ${fileName}`);
}

console.log(`\n${submissions.length} campaign forms passed isolated persistence checks.`);
