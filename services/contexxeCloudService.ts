import { sendFormNotification } from './notificationApiService';

export interface ContexxeCloudOfferRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  sector: string;
  users: string;
  storage: string;
  priorities: string[];
  migration: string;
  timeline: string;
  message: string;
  referenceNumber: string;
  submissionDate: string;
}

export const sendContexxeCloudOfferRequest = async (
  data: ContexxeCloudOfferRequest,
): Promise<void> => {
  await sendFormNotification({
    formType: 'contexxe_cloud',
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    organisation: data.organisation,
    referenceNumber: data.referenceNumber,
    submissionDate: data.submissionDate,
    status: 'Nouvelle demande d’offre',
    details: {
      Fonction: data.role,
      Secteur: data.sector,
      Utilisateurs: data.users,
      'Capacité souhaitée': data.storage,
      'Besoins prioritaires': data.priorities.join(', '),
      Migration: data.migration,
      'Délai envisagé': data.timeline,
      Message: data.message || 'Non précisé',
    },
  });
};
