import emailjs from '@emailjs/browser';

// Initialize EmailJS
const EMAILJS_SERVICE_ID = 'service_zsemrdi';
const EMAILJS_PUBLIC_KEY = 'ysWtYnFgf6oXyDQdz';
const EMAILJS_TEMPLATE_ADMIN = 'template_d4tyizn'; // Template générique pour admin
const EMAILJS_TEMPLATE_USER = 'template_nnfd7xd'; // Template pour utilisateur

try {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  console.log('EmailJS initialized successfully');
} catch (error) {
  console.error('EmailJS initialization error:', error);
}

export interface MasterclassRegistrationEmail {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  city: string;
  referenceNumber: string;
  registrationDate: string;
  paymentStatus: 'pending' | 'completed' | 'office';
  transactionId?: string;
  paymentDate?: string;
}

// Send confirmation email to admin (MboMa) - Generic template
export const sendAdminConfirmationEmail = async (data: MasterclassRegistrationEmail): Promise<void> => {
  try {
    console.log('Sending admin email to co@mboma.org...');
    
    const paymentInfo = data.paymentStatus === 'completed' 
      ? `Effectué - ${data.transactionId || 'N/A'}` 
      : data.paymentStatus === 'office' 
      ? 'Au Siège' 
      : 'En Attente';

    const templateParams = {
      to_email: 'co@mboma.org',
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone || 'N/A',
      company: data.company || 'N/A',
      country: data.country || 'N/A',
      city: data.city || 'N/A',
      service_type: 'Masterclass',
      reference_number: data.referenceNumber,
      submission_date: data.registrationDate,
      status: 'Nouvelle Inscription',
      additional_label: 'Statut de Paiement',
      additional_info: paymentInfo,
      message: `Dates: 19-21 Février 2026\nHoraires: 17h00-19h30\nFormat: En ligne & Présentiel\nLieu: 67 Boulevard 30 Juin, Kinshasa`
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ADMIN,
      templateParams
    );

    console.log('✅ Admin email sent successfully:', response.status);
  } catch (error) {
    console.error('❌ Error sending admin email:', error);
    throw error;
  }
};

// Send confirmation email to user - Generic template
export const sendUserConfirmationEmail = async (data: MasterclassRegistrationEmail): Promise<void> => {
  try {
    console.log('Sending user email to', data.email);
    
    const templateParams = {
      to_email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      reference_number: data.referenceNumber,
      registration_date: data.registrationDate,
      payment_status: data.paymentStatus === 'completed' ? 'Paiement Effectué' : data.paymentStatus === 'office' ? 'Paiement au Siège' : 'Paiement en Attente',
      transaction_id: data.transactionId || 'N/A',
      payment_date: data.paymentDate || 'N/A'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_USER,
      templateParams
    );

    console.log('✅ User email sent successfully:', response.status);
  } catch (error) {
    console.error('❌ Error sending user email:', error);
    throw error;
  }
};
