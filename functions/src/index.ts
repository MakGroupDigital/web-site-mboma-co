import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

/**
 * Send Masterclass confirmation email
 */
export const sendMasterclassConfirmation = functions.https.onCall(async (data, context) => {
  try {
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
      paymentStatus,
      registrationPdfUrl,
      receiptPdfUrl
    } = data;

    // Email to user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #6E8F3A 0%, #FF8C00 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: white; padding: 30px; }
            .section { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #FF8C00; }
            .button { display: inline-block; background-color: #6E8F3A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
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
                <p><strong>Statut:</strong> ${paymentStatus}</p>
              </div>

              <div class="section">
                <h3>📋 Prochaines Étapes</h3>
                <ol>
                  <li>Téléchargez votre fiche d'inscription (lien ci-dessous)</li>
                  <li>Conservez votre numéro de référence</li>
                  <li>Rejoignez notre communauté WhatsApp</li>
                  <li>Préparez-vous pour le 19 février à 17h00</li>
                </ol>
              </div>

              ${registrationPdfUrl ? `
                <p style="text-align: center;">
                  <a href="${registrationPdfUrl}" class="button">📥 Télécharger votre fiche d'inscription</a>
                </p>
              ` : ''}

              ${receiptPdfUrl ? `
                <p style="text-align: center;">
                  <a href="${receiptPdfUrl}" class="button">📥 Télécharger votre reçu de paiement</a>
                </p>
              ` : ''}

              <div class="footer">
                <p>Des questions? Contactez-nous à co@mboma.org</p>
                <p>© 2026 MboMa & Co. - Tous droits réservés</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Confirmation de votre inscription - Masterclass MboMa & Co',
      html: userEmailHtml
    });

    // Email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #6E8F3A 0%, #FF8C00 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: white; padding: 30px; }
            .section { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #FF8C00; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
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
                <p><strong>Pays:</strong> ${country || 'N/A'}</p>
                <p><strong>Ville:</strong> ${city || 'N/A'}</p>
              </div>

              <div class="section">
                <h3>📋 Détails de l'Inscription</h3>
                <p><strong>Numéro de Référence:</strong> ${referenceNumber}</p>
                <p><strong>Date d'Inscription:</strong> ${registrationDate}</p>
                <p><strong>Statut de Paiement:</strong> ${paymentStatus}</p>
              </div>

              <div class="footer">
                <p>Vérifiez le dashboard pour plus de détails</p>
                <p>© 2026 MboMa & Co.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'co@mboma.org',
      subject: `Nouvelle inscription Masterclass - ${firstName} ${lastName}`,
      html: adminEmailHtml
    });

    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('Error sending masterclass confirmation:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send confirmation email');
  }
});

/**
 * Send Audit confirmation email
 */
export const sendAuditConfirmation = functions.https.onCall(async (data, context) => {
  try {
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
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #6E8F3A 0%, #FF8C00 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: white; padding: 30px; }
            .section { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #FF8C00; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
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

              <div class="footer">
                <p>Des questions? Contactez-nous à co@mboma.org</p>
                <p>© 2026 MboMa & Co. - Tous droits réservés</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Confirmation de votre demande d\'audit - MboMa & Co',
      html: userEmailHtml
    });

    // Email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #6E8F3A 0%, #FF8C00 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: white; padding: 30px; }
            .section { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #FF8C00; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
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
                <p><strong>Entreprise:</strong> ${company || 'N/A'}</p>
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

              <div class="footer">
                <p>Veuillez traiter cette demande et contacter le client sous 24h</p>
                <p>© 2026 MboMa & Co.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'co@mboma.org',
      subject: `Nouvelle demande d'audit - ${firstName} ${lastName}`,
      html: adminEmailHtml
    });

    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('Error sending audit confirmation:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send confirmation email');
  }
});
