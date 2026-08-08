import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { sendCampaignLeadEmail } from './campaignEmailService';

export interface CampaignRequest {
  campaignName: string;
  campaignSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  organisationSize: string;
  objective: string;
  priorities: string[];
  currentTools: string;
  message: string;
  referenceNumber: string;
  submissionDate: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}

export const saveCampaignRequest = async (data: CampaignRequest): Promise<string> => {
  const document = await addDoc(collection(db, 'campaign_requests'), {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return document.id;
};

export const sendCampaignConfirmation = async (data: CampaignRequest): Promise<void> => {
  try {
    await sendCampaignLeadEmail({
      campaignName: data.campaignName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      organisation: data.organisation,
      referenceNumber: data.referenceNumber,
      submissionDate: data.submissionDate,
      objective: [data.objective, ...data.priorities].filter(Boolean).join(' · '),
      details: [
        `Fonction : ${data.role}`,
        `Taille : ${data.organisationSize}`,
        `Outils / avancement : ${data.currentTools || 'Non précisé'}`,
        `Message : ${data.message || 'Non précisé'}`,
      ].join('\n'),
    });
  } catch (error) {
    // The lead is already stored; an email outage must not invalidate the request.
    console.error('Campaign confirmation email could not be sent:', error);
  }
};
