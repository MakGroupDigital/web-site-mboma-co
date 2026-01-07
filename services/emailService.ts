import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID', 
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

// Interface pour les données du formulaire
export interface AuditFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  auditType: string;
  message: string;
}

// Fonction pour envoyer l'email
export const sendAuditRequest = async (formData: AuditFormData): Promise<boolean> => {
  try {
    // Préparer les données pour EmailJS
    const templateParams = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      company: formData.company,
      audit_type: formData.auditType,
      message: formData.message,
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      user_ip: 'Non disponible', // Optionnel
      user_agent: navigator.userAgent.substring(0, 100) // Limité pour éviter les erreurs
    };

    // Envoyer l'email via EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('Email envoyé avec succès:', response);
    return true;

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};

// Fonction pour initialiser EmailJS (optionnel)
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};