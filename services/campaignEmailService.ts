import { NotificationFormType, sendFormNotification } from './notificationApiService';

export interface CampaignEmailPayload {
  campaignName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organisation: string;
  referenceNumber: string;
  submissionDate: string;
  objective: string;
  details: string;
}

const campaignTypes: Record<string, NotificationFormType> = {
  'Technology Partnership Program': 'technology_partnership',
  'Audit technologique': 'technology_audit',
  'Digitalisez votre entreprise': 'digitalization',
  'Vous avez une idée d’application ?': 'app_idea',
  'Automatisez vos tâches avec l’IA': 'ai_automation',
};

export const sendCampaignLeadEmail = async (data: CampaignEmailPayload): Promise<void> => {
  const formType = campaignTypes[data.campaignName];
  if (!formType) throw new Error(`Unknown campaign notification type: ${data.campaignName}`);

  await sendFormNotification({
    formType,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    organisation: data.organisation,
    referenceNumber: data.referenceNumber,
    submissionDate: data.submissionDate,
    status: 'Nouvelle demande',
    details: {
      'Objectif / Priorités': data.objective || 'À qualifier',
      Détails: data.details || 'Aucun détail complémentaire',
    },
  });
};
