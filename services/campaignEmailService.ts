import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_zsemrdi';
const EMAILJS_PUBLIC_KEY = 'ysWtYnFgf6oXyDQdz';
const EMAILJS_ADMIN_TEMPLATE = 'template_d4tyizn';
const ADMIN_EMAIL = 'co@mboma.org';

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

/**
 * Notify the MboMa team through the project's existing EmailJS service.
 * Firestore remains the source of truth, so an email outage never loses a lead.
 */
export const sendCampaignLeadEmail = async (data: CampaignEmailPayload): Promise<void> => {
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_ADMIN_TEMPLATE,
    {
      to_email: ADMIN_EMAIL,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      reply_to: data.email,
      phone: data.phone || 'N/A',
      company: data.organisation || 'N/A',
      service_type: data.campaignName,
      reference_number: data.referenceNumber,
      submission_date: data.submissionDate,
      status: 'Nouvelle demande',
      additional_label: 'Objectif / Priorités',
      additional_info: data.objective || 'À qualifier',
      message: data.details || 'Aucun détail complémentaire',
    },
    { publicKey: EMAILJS_PUBLIC_KEY },
  );
};
