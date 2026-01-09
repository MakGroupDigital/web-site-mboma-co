import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Resend } from 'resend';

admin.initializeApp();

// Resend configuration
const RESEND_API_KEY = 're_BQTcygKP_8ivtZ5YVxbNXcAaAe8QsQcg8';
const FROM_EMAIL = 'co@mboma.org';
const ADMIN_EMAIL = 'mbomacorporation.inc@gmail.com';

const resend = new Resend(RESEND_API_KEY);

/**
 * Send Masterclass confirmation email via Resend
 */
export const sendMasterclassConfirmation = functions.https.onCall(async (data, context) => {
  try {
    console.log('📧 [RESEND] Starting sendMasterclassConfirmation...');
    console.log('📧 [RESEND] Data received:', JSON.stringify(data));

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      country,
      city,
      referenceNumber,
      registrationDate,
      paymentStatus
    } = data;

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
              <p>Bonjour <strong>${firstName} ${lastName}</strong>,</p>
              <p>Merci de vous être inscrit à notre masterclass exclusive <strong>"Dormez & Gagnez"</strong>!</p>
              
              <div class="section">
                <h3>✅ Confirmation d'Inscription</h3>
                <p><strong>Numéro de Référence:</strong> ${referenceNumber}</p>
                <p><strong>Date d'Inscription:</strong> ${registrationDate}</p>
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
                <p><strong>Statut:</strong> ${paymentStatus === 'pending' ? 'En attente' : paymentStatus === 'completed' ? 'Payé' : 'Paiement au bureau'}</p>
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

    console.log('📤 Sending email to user:', email);
    
    // Send to user via Resend
    const userEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Confirmation de votre inscription - Masterclass MboMa & Co',
      html: userEmailHtml
    });

    console.log('✅ User email sent:', userEmailResult);

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
                <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Téléphone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Entreprise:</strong> ${company || 'N/A'}</p>
                <p><strong>Pays:</strong> ${country}</p>
                <p><strong>Ville:</strong> ${city}</p>
              </div>

              <div class="section">
                <h3>📋 Détails de l'Inscription</h3>
                <p><strong>Numéro de Référence:</strong> ${referenceNumber}</p>
                <p><strong>Date d'Inscription:</strong> ${registrationDate}</p>
                <p><strong>Statut de Paiement:</strong> ${paymentStatus}</p>
              </div>
            </div>
            <div class="footer">
              <p>© 2026 MboMa & Co.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('📤 Sending email to admin:', ADMIN_EMAIL);

    // Send to admin via Resend
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Nouvelle inscription Masterclass - ${firstName} ${lastName}`,
      html: adminEmailHtml
    });

    console.log('✅ Admin email sent:', adminEmailResult);

    return { success: true, message: 'Emails sent successfully' };
  } catch (error: any) {
    console.error('❌ Error sending masterclass confirmation:', error);
    console.error('Error details:', error.message);
    throw new functions.https.HttpsError('internal', `Failed to send confirmation email: ${error.message}`);
  }
});

/**
 * Send Audit confirmation email via Resend
 */
export const sendAuditConfirmation = functions.https.onCall(async (data, context) => {
  try {
    console.log('📧 Starting sendAuditConfirmation...');
    console.log('Data received:', JSON.stringify(data));

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      auditType,
      message,
      referenceNumber,
      submissionDate
    } = data;

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
              <p>Bonjour <strong>${firstName} ${lastName}</strong>,</p>
              <p>Merci pour votre demande d'audit. Nous avons bien reçu votre demande et notre équipe l'examinera sous peu.</p>
              
              <div class="section">
                <h3>📋 Détails de votre Demande</h3>
                <p><strong>Numéro de Référence:</strong> ${referenceNumber}</p>
                <p><strong>Type d'Audit:</strong> ${auditType}</p>
                <p><strong>Date de Soumission:</strong> ${submissionDate}</p>
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

    console.log('📤 Sending email to user:', email);

    // Send to user via Resend
    const userEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Confirmation de votre demande d\'audit - MboMa & Co',
      html: userEmailHtml
    });

    console.log('✅ User email sent:', userEmailResult);

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
                <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Téléphone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Entreprise:</strong> ${company}</p>
              </div>

              <div class="section">
                <h3>📋 Détails de la Demande</h3>
                <p><strong>Numéro de Référence:</strong> ${referenceNumber}</p>
                <p><strong>Type d'Audit:</strong> ${auditType}</p>
                <p><strong>Date de Soumission:</strong> ${submissionDate}</p>
              </div>

              <div class="section">
                <h3>💬 Message du Client</h3>
                <p>${message || 'Aucun message'}</p>
              </div>
            </div>
            <div class="footer">
              <p>© 2026 MboMa & Co.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('📤 Sending email to admin:', ADMIN_EMAIL);

    // Send to admin via Resend
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Nouvelle demande d'audit - ${firstName} ${lastName}`,
      html: adminEmailHtml
    });

    console.log('✅ Admin email sent:', adminEmailResult);

    return { success: true, message: 'Emails sent successfully' };
  } catch (error: any) {
    console.error('❌ Error sending audit confirmation:', error);
    console.error('Error details:', error.message);
    throw new functions.https.HttpsError('internal', `Failed to send confirmation email: ${error.message}`);
  }
});
