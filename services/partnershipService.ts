import { sendCampaignLeadEmail } from './campaignEmailService';

export interface PartnershipRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organisation: string;
  organisationType: string;
  role: string;
  partnershipGoal: string;
  projectStage: string;
  message: string;
  referenceNumber: string;
  submissionDate: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}

export const sendPartnershipConfirmationEmail = async (data: PartnershipRequest): Promise<void> => {
  await sendCampaignLeadEmail({
    campaignName: 'Technology Partnership Program',
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    organisation: data.organisation,
    referenceNumber: data.referenceNumber,
    submissionDate: data.submissionDate,
    objective: `${data.partnershipGoal} · ${data.projectStage}`,
    details: [
      `Type d’organisation : ${data.organisationType}`,
      `Fonction : ${data.role}`,
      `Message : ${data.message}`,
    ].join('\n'),
  });
};
