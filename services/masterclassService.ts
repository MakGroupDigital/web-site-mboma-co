import { sendFormNotification } from './notificationApiService';

export interface MasterclassRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  city: string;
  referenceNumber: string;
  registrationDate: string;
  paymentStatus: 'pending' | 'completed' | 'office';
  transactionId?: string;
  paymentDate?: string;
  registrationPdfUrl?: string;
  receiptPdfUrl?: string;
}

/**
 * Send confirmation through the notification service hosted on the VM.
 */
export const sendConfirmationEmail = async (
  submissionId: string,
  data: MasterclassRegistration
): Promise<void> => {
  await sendFormNotification({
    formType: 'masterclass',
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    organisation: data.company,
    referenceNumber: data.referenceNumber,
    submissionDate: data.registrationDate,
    status: data.paymentStatus,
    details: {
      Pays: data.country,
      Ville: data.city,
      "Identifiant de soumission": submissionId,
      Transaction: data.transactionId || 'Non renseignée',
    },
  });
};
