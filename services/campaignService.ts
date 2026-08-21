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

export const sendCampaignConfirmation = async (data: CampaignRequest): Promise<void> => {
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
};
