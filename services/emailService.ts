import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_SERVICE_ID = 'service_zsemrdi';
const EMAILJS_PUBLIC_KEY = 'ysWtYnFgf6oXyDQdz';
const EMAILJS_TEMPLATE_ADMIN = 'template_d4tyizn'; // Template générique pour admin
const EMAILJS_TEMPLATE_USER = 'template_nnfd7xd'; // Template pour utilisateur

// Interface pour les données du formulaire d'audit
export interface AuditFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  auditType: string;
  message: string;
}

// Initialiser EmailJS
try {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  console.log('EmailJS initialized');
} catch (error) {
  console.error('EmailJS init error:', error);
}

// Fonction pour envoyer l'email d'audit à l'admin
export const sendAuditRequest = async (formData: AuditFormData): Promise<boolean> => {
  try {
    console.log('Sending audit request to admin...');
    
    const referenceNumber = `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const submissionDate = new Date().toLocaleDateString('fr-FR');

    // Email à l'admin
    const adminParams = {
      to_email: 'co@mboma.org',
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: 'N/A',
      company: formData.company || 'N/A',
      country: 'N/A',
      city: 'N/A',
      service_type: 'Audit',
      reference_number: referenceNumber,
      submission_date: submissionDate,
      status: 'Nouvelle Demande',
      additional_label: 'Type d\'Audit',
      additional_info: formData.auditType,
      message: formData.message
    };

    const adminResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ADMIN,
      adminParams
    );

    console.log('✅ Admin audit email sent:', adminResponse.status);

    // Email à l'utilisateur
    const userParams = {
      to_email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      reference_number: referenceNumber,
      registration_date: submissionDate,
      payment_status: 'Demande Reçue',
      transaction_id: 'N/A',
      payment_date: 'N/A'
    };

    const userResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_USER,
      userParams
    );

    console.log('✅ User audit confirmation email sent:', userResponse.status);
    return true;

  } catch (error) {
    console.error('❌ Error sending audit emails:', error);
    return false;
  }
};

// Fonction pour initialiser EmailJS (optionnel)
export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};