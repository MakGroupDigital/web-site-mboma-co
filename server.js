import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const adminWhatsAppNumber = process.env.ADMIN_WHATSAPP_NUMBER;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Send WhatsApp message to user (confirmation)
app.post('/api/whatsapp/send-user-confirmation', async (req, res) => {
  try {
    const { phoneNumber, firstName, lastName, referenceNumber, registrationDate, service } = req.body;

    if (!phoneNumber || !firstName || !referenceNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const userMessage = `Bonjour ${firstName} ${lastName},

Merci de votre inscription à ${service}!

📋 Détails:
• Numéro de Référence: ${referenceNumber}
• Date d'Inscription: ${registrationDate}

Conservez ce numéro pour toute correspondance.

L'équipe MboMa & Co.
co@mboma.org`;

    const message = await client.messages.create({
      from: twilioWhatsAppNumber,
      to: `whatsapp:${phoneNumber}`,
      body: userMessage
    });

    console.log(`✅ User WhatsApp sent: ${message.sid}`);
    res.json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error('❌ Error sending user WhatsApp:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send WhatsApp message to admin (notification)
app.post('/api/whatsapp/send-admin-notification', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, country, city, referenceNumber, registrationDate, service, paymentStatus } = req.body;

    if (!firstName || !referenceNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const adminMessage = `📢 NOUVELLE INSCRIPTION

Service: ${service}
Nom: ${firstName} ${lastName}
Email: ${email}
Téléphone: ${phone || 'N/A'}
Entreprise: ${company || 'N/A'}
Pays: ${country || 'N/A'}
Ville: ${city || 'N/A'}

Numéro de Référence: ${referenceNumber}
Date: ${registrationDate}
Statut Paiement: ${paymentStatus || 'En Attente'}

Vérifiez le dashboard pour plus de détails.`;

    const message = await client.messages.create({
      from: twilioWhatsAppNumber,
      to: `whatsapp:${adminWhatsAppNumber}`,
      body: adminMessage
    });

    console.log(`✅ Admin WhatsApp sent: ${message.sid}`);
    res.json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error('❌ Error sending admin WhatsApp:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send both messages (user + admin)
app.post('/api/whatsapp/send-confirmation', async (req, res) => {
  try {
    const { phoneNumber, firstName, lastName, email, phone, company, country, city, referenceNumber, registrationDate, service, paymentStatus } = req.body;

    if (!phoneNumber || !firstName || !referenceNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send to user
    const userMessage = `Bonjour ${firstName} ${lastName},

Merci de votre inscription à ${service}!

📋 Détails:
• Numéro de Référence: ${referenceNumber}
• Date d'Inscription: ${registrationDate}

Conservez ce numéro pour toute correspondance.

L'équipe MboMa & Co.
co@mboma.org`;

    const userMsg = await client.messages.create({
      from: twilioWhatsAppNumber,
      to: `whatsapp:${phoneNumber}`,
      body: userMessage
    });

    // Send to admin
    const adminMessage = `📢 NOUVELLE INSCRIPTION

Service: ${service}
Nom: ${firstName} ${lastName}
Email: ${email}
Téléphone: ${phone || 'N/A'}
Entreprise: ${company || 'N/A'}
Pays: ${country || 'N/A'}
Ville: ${city || 'N/A'}

Numéro de Référence: ${referenceNumber}
Date: ${registrationDate}
Statut Paiement: ${paymentStatus || 'En Attente'}`;

    const adminMsg = await client.messages.create({
      from: twilioWhatsAppNumber,
      to: `whatsapp:${adminWhatsAppNumber}`,
      body: adminMessage
    });

    console.log(`✅ Both WhatsApp messages sent`);
    res.json({ 
      success: true, 
      userMessageSid: userMsg.sid,
      adminMessageSid: adminMsg.sid 
    });
  } catch (error) {
    console.error('❌ Error sending WhatsApp messages:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 WhatsApp API ready`);
});
