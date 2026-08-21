import { sendFormNotification } from './notificationApiService';

export interface AuditRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  auditType: string;
  message: string;
  referenceNumber: string;
  submissionDate: string;
  status: 'new' | 'in_progress' | 'completed';
}

/**
 * Send audit confirmation through the notification service hosted on the VM.
 */
export const sendAuditConfirmationEmail = async (data: AuditRequest): Promise<void> => {
  await sendFormNotification({
    formType: 'audit_booking',
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || '',
    organisation: data.company,
    referenceNumber: data.referenceNumber,
    submissionDate: data.submissionDate,
    status: 'Nouvelle demande',
    details: {
      "Type d’audit": data.auditType,
      Message: data.message || 'Non précisé',
    },
  });
};
