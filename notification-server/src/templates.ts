import type { FormType, NotificationPayload } from './types.js';

const formLabels: Record<FormType, string> = {
  technology_partnership: 'Technology Partnership Program',
  technology_audit: 'Audit technologique',
  digitalization: 'Digitalisez votre entreprise',
  app_idea: 'Idée d’application',
  ai_automation: 'Automatisation avec l’IA',
  audit_booking: 'Réservation d’audit',
  masterclass: 'Masterclass MboMa & Co.',
};

const escapeHtml = (value: string): string => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const layout = (title: string, content: string): string => `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${escapeHtml(title)}</title></head>
<body style="margin:0;background:#f4f5f1;font-family:Arial,sans-serif;color:#333">
  <div style="max-width:640px;margin:0 auto;padding:28px 14px">
    <div style="background:#66883d;color:#fff;padding:24px 30px 26px;border-radius:14px 14px 0 0">
      <img src="cid:mboma-logo" width="270" alt="MboMa &amp; Co." style="display:block;width:270px;max-width:100%;height:auto;margin:0 0 18px" />
      <h1 style="font-size:25px;margin:10px 0 0">${escapeHtml(title)}</h1>
    </div>
    <div style="background:#fff;padding:30px;border-radius:0 0 14px 14px">${content}</div>
    <p style="text-align:center;color:#777;font-size:12px;margin:18px 0">MboMa &amp; Co. · co@mboma.org · Kinshasa, RDC</p>
  </div>
</body></html>`;

export const buildEmails = (data: NotificationPayload) => {
  const service = formLabels[data.formType];
  const fullName = `${data.firstName} ${data.lastName}`;
  const details = Object.entries(data.details)
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `<tr><td style="padding:7px 10px;color:#777;vertical-align:top">${escapeHtml(label)}</td><td style="padding:7px 10px;font-weight:600;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
    .join('');

  const userHtml = layout('Votre demande a bien été reçue', `
    <p>Bonjour <strong>${escapeHtml(fullName)}</strong>,</p>
    <p style="line-height:1.7">Merci d’avoir contacté MboMa &amp; Co. au sujet de <strong>${escapeHtml(service)}</strong>. Notre équipe examinera votre demande et vous contactera prochainement.</p>
    <div style="margin:24px 0;padding:18px;background:#f7f8f4;border-left:4px solid #ef8d32">
      <div style="font-size:12px;color:#777;text-transform:uppercase;letter-spacing:1px">Référence</div>
      <div style="font-size:20px;font-weight:700;margin-top:5px">${escapeHtml(data.referenceNumber)}</div>
      <div style="font-size:13px;color:#777;margin-top:5px">Soumise le ${escapeHtml(data.submissionDate)}</div>
    </div>
    <p style="line-height:1.7">Conservez cette référence pour vos échanges avec notre équipe.</p>
  `);

  const adminHtml = layout(`Nouvelle demande — ${service}`, `
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:7px 10px;color:#777">Nom</td><td style="padding:7px 10px;font-weight:600">${escapeHtml(fullName)}</td></tr>
      <tr><td style="padding:7px 10px;color:#777">E-mail</td><td style="padding:7px 10px;font-weight:600">${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding:7px 10px;color:#777">Téléphone</td><td style="padding:7px 10px;font-weight:600">${escapeHtml(data.phone || 'Non renseigné')}</td></tr>
      <tr><td style="padding:7px 10px;color:#777">Organisation</td><td style="padding:7px 10px;font-weight:600">${escapeHtml(data.organisation || 'Non renseignée')}</td></tr>
      <tr><td style="padding:7px 10px;color:#777">Référence</td><td style="padding:7px 10px;font-weight:600">${escapeHtml(data.referenceNumber)}</td></tr>
      <tr><td style="padding:7px 10px;color:#777">Date</td><td style="padding:7px 10px;font-weight:600">${escapeHtml(data.submissionDate)}</td></tr>
      ${data.status ? `<tr><td style="padding:7px 10px;color:#777">Statut</td><td style="padding:7px 10px;font-weight:600">${escapeHtml(data.status)}</td></tr>` : ''}
      ${details}
    </table>
  `);

  return {
    service,
    user: {
      subject: `Confirmation de votre demande — ${service}`,
      html: userHtml,
      text: `Bonjour ${fullName}, votre demande « ${service} » a bien été reçue. Référence : ${data.referenceNumber}. MboMa & Co. vous contactera prochainement.`,
    },
    admin: {
      subject: `Nouvelle demande ${service} — ${fullName}`,
      html: adminHtml,
      text: `Nouvelle demande ${service}\nNom: ${fullName}\nE-mail: ${data.email}\nTéléphone: ${data.phone || 'Non renseigné'}\nOrganisation: ${data.organisation || 'Non renseignée'}\nRéférence: ${data.referenceNumber}`,
    },
  };
};
