import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
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

export const savePartnershipRequest = async (data: PartnershipRequest): Promise<string> => {
  const docRef = await addDoc(collection(db, 'partnership_requests'), {
    ...data,
    campaign: 'Technology Partnership Program',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef.id;
};

export const sendPartnershipConfirmationEmail = async (data: PartnershipRequest): Promise<void> => {
  try {
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
  } catch (error) {
    // The request is already safely stored. An email failure must not block the applicant.
    console.error('Partnership confirmation email could not be sent:', error);
  }
};
