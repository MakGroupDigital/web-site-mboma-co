export type NotificationFormType =
  | 'technology_partnership'
  | 'technology_audit'
  | 'digitalization'
  | 'app_idea'
  | 'ai_automation'
  | 'audit_booking'
  | 'masterclass';

export interface NotificationRequest {
  formType: NotificationFormType;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organisation?: string;
  referenceNumber: string;
  submissionDate: string;
  status?: string;
  details?: Record<string, string>;
}

const configuredUrl = import.meta.env.VITE_NOTIFICATION_API_URL?.trim();
const API_BASE_URL = configuredUrl
  ? configuredUrl.replace(/\/$/, '')
  : import.meta.env.DEV
    ? 'http://localhost:8787'
    : 'https://mboma-notifications.104.154.90.30.sslip.io';

export const sendFormNotification = async (data: NotificationRequest): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/form-submission`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, website: '' }),
  });

  if (!response.ok) {
    throw new Error(`Notification API returned ${response.status}`);
  }
};
