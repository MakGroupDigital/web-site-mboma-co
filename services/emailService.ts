// Email service using Resend API
// Deprecated browser-side service. Never put a private provider key in Vite/client code.
// Notifications now pass through the API hosted on the VM.
const RESEND_API_KEY = '';
const FROM_EMAIL = 'onboarding@resend.dev';
const ADMIN_EMAIL = 'mbomacorporation.inc@gmail.com';

interface MasterclassEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  country: string;
  city: string;
  referenceNumber: string;
  registrationDate: string;
  paymentStatus: string;
}

interface AuditEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  auditType: string;
  message?: string;
  referenceNumber: string;
  submissionDate: string;
}

/**
 * Send Masterclass confirmation email via Resend
 */
export const sendMasterclassEmail = async (data: MasterclassEmailData): Promise<boolean> => {
  try {
    console.log('📧 Sending masterclass confirmation email via Resend...');

    // Email to user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #f9f9f9; }
            .header { background: linear-gradient(135deg, #6E8F3A 0%, #FF8C00 100%); color: white; padding: 30px; text-align: center; }
            .content { background-color: white; padding: 30px; }
            .section { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #FF8C00; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Bienvenue à la Masterclass!</h1>
              <p>Votre inscription a été confirmée avec succès</p>
            </div>
            <div class="content">
              <p>Bonjour <strong>${data.firstName} ${data.lastName}</strong>,</p>
              <p>Merci de vous être inscrit à notre masterclass exclusive <strong>"Dormez & Gagnez"</strong>!</p>
              
              <div class="section">
                <h3>✅ Confirmation d'Inscription</h3>
                <p><strong>Numéro de Référence:</strong> ${data.referenceNumber}</p>
                <p><strong>Date d'Inscription:</strong> ${data.registrationDate}</p>
              </div>

              <div class="section">
                <h3>📅 Détails de la Masterclass</h3>
                <p><strong>Titre:</strong> Dormez & Gagnez - L'art de l'automatisation totale</p>
                <p><strong>Dates:</strong> 19-21 Février 2026</p>
                <p><strong>Horaires:</strong> 17h00-19h30</p>
                <p><strong>Format:</strong> En ligne & Présentiel (Kinshasa)</p>
                <p><strong>Lieu:</strong> 67 Boulevard 30 Juin, Kinshasa, RDC</p>
              </div>

              <div class="section">
                <h3>💳 Statut de Paiement</h3>
                <p><strong>Statut:</strong> ${data.paymentStatus === 'pending' ? 'En attente' : data.paymentStatus === 'completed' ? 'Payé' : 'Paiement au bureau'}</p>
              </div>

              <div class="section">
                <h3>📋 Prochaines Étapes</h3>
                <ol>
                  <li>Conservez votre numéro de référence</li>
                  <li>Rejoignez notre communauté WhatsApp</li>
                  <li>Préparez-vous pour le 19 février à 17h00</li>
                </ol>
              </div>
            </div>
            <div class="footer">
              <p>Des questions? Contactez-nous à co@mboma.org</p>
              <p>© 2026 MboMa & Co. - Tous droits réservés</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send to user
    const userResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: data.email,
        subject: 'Confirmation de votre inscription - Masterclass MboMa & Co',
        html: userEmailHtml
      })
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.error('❌ Resend API error (user):', errorData);
      throw new Error(`Failed to send user email: ${JSON.stringify(errorData)}`);
    }

    console.log('✅ User email sent successfully');

    // Email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #f9f9f9; }
            .header { background: linear-gradient(135deg, #6E8F3A 0%, #FF8C00 100%); color: white; padding: 30px; text-align: center; }
            .content { background-color: white; padding: 30px; }
            .section { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #FF8C00; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📢 Nouvelle Inscription Masterclass</h1>
            </div>
            <div class="content">
              <div class="section">
                <h3>👤 Informations du Participant</h3>
                <p><strong>Nom:</strong> ${data.firstName} ${data.lastName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Téléphone:</strong> ${data.phone || 'N/A'}</p>
                <p><strong>Entreprise:</strong> ${data.company || 'N/A'}</p>
                <p><strong>Pays:</strong> ${data.country}</p>
                <p><strong>Ville:</strong> ${data.city}</p>
              </div>

              <div class="section">
                <h3>📋 Détails de l'Inscription</h3>
                <p><strong>Numéro de Référence:</strong> ${data.referenceNumber}</p>
                <p><strong>Date d'Inscription:</strong> ${data.registrationDate}</p>
                <p><strong>Statut de Paiement:</strong> ${data.paymentStatus}</p>
              </div>
            </div>
            <div class="footer">
              <p>© 2026 MboMa & Co.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send to admin
    const adminResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Nouvelle inscription Masterclass - ${data.firstName} ${data.lastName}`,
        html: adminEmailHtml
      })
    });

    if (!adminResponse.ok) {
      const errorData = await adminResponse.json();
      console.error('❌ Resend API error (admin):', errorData);
      // Don't throw for admin email failure
    } else {
      console.log('✅ Admin email sent successfully');
    }

    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};

/**
 * Send Audit confirmation email via Resend
 */
export const sendAuditEmail = async (data: AuditEmailData): Promise<boolean> => {
  try {
    console.log('📧 Sending audit confirmation email via Resend...');

    // Email to user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #f9f9f9; }
            .header { background: linear-gradient(135deg, #6E8F3A 0%, #FF8C00 100%); color: white; padding: 30px; text-align: center; }
            .content { background-color: white; padding: 30px; }
            .section { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #FF8C00; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Demande d'Audit Reçue</h1>
            </div>
            <div class="content">
              <p>Bonjour <strong>${data.firstName} ${data.lastName}</strong>,</p>
              <p>Merci pour votre demande d'audit. Nous avons bien reçu votre demande et notre équipe l'examinera sous peu.</p>
              
              <div class="section">
                <h3>📋 Détails de votre Demande</h3>
                <p><strong>Numéro de Référence:</strong> ${data.referenceNumber}</p>
                <p><strong>Type d'Audit:</strong> ${data.auditType}</p>
                <p><strong>Date de Soumission:</strong> ${data.submissionDate}</p>
              </div>

              <div class="section">
                <h3>📞 Prochaines Étapes</h3>
                <p>Notre équipe d'experts vous contactera sous 24h pour:</p>
                <ul>
                  <li>Discuter de vos besoins spécifiques</li>
                  <li>Proposer un devis personnalisé</li>
                  <li>Planifier l'audit</li>
                </ul>
              </div>
            </div>
            <div class="footer">
              <p>Des questions? Contactez-nous à co@mboma.org</p>
              <p>© 2026 MboMa & Co. - Tous droits réservés</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send to user
    const userResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: data.email,
        subject: 'Confirmation de votre demande d\'audit - MboMa & Co',
        html: userEmailHtml
      })
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.error('❌ Resend API error (user):', errorData);
      throw new Error(`Failed to send user email: ${JSON.stringify(errorData)}`);
    }

    console.log('✅ User email sent successfully');

    // Email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #f9f9f9; }
            .header { background: linear-gradient(135deg, #6E8F3A 0%, #FF8C00 100%); color: white; padding: 30px; text-align: center; }
            .content { background-color: white; padding: 30px; }
            .section { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #FF8C00; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📢 Nouvelle Demande d'Audit</h1>
            </div>
            <div class="content">
              <div class="section">
                <h3>👤 Informations du Client</h3>
                <p><strong>Nom:</strong> ${data.firstName} ${data.lastName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Téléphone:</strong> ${data.phone || 'N/A'}</p>
                <p><strong>Entreprise:</strong> ${data.company}</p>
              </div>

              <div class="section">
                <h3>📋 Détails de la Demande</h3>
                <p><strong>Numéro de Référence:</strong> ${data.referenceNumber}</p>
                <p><strong>Type d'Audit:</strong> ${data.auditType}</p>
                <p><strong>Date de Soumission:</strong> ${data.submissionDate}</p>
              </div>

              <div class="section">
                <h3>💬 Message du Client</h3>
                <p>${data.message || 'Aucun message'}</p>
              </div>
            </div>
            <div class="footer">
              <p>© 2026 MboMa & Co.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send to admin
    const adminResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Nouvelle demande d'audit - ${data.firstName} ${data.lastName}`,
        html: adminEmailHtml
      })
    });

    if (!adminResponse.ok) {
      const errorData = await adminResponse.json();
      console.error('❌ Resend API error (admin):', errorData);
    } else {
      console.log('✅ Admin email sent successfully');
    }

    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};
