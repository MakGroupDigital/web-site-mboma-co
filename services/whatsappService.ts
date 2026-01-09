// WhatsApp Service using Twilio backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface WhatsAppConfirmationData {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  city: string;
  referenceNumber: string;
  registrationDate: string;
  service: string;
  paymentStatus?: string;
}

/**
 * Send WhatsApp confirmation to user and admin
 */
export const sendWhatsAppConfirmation = async (data: WhatsAppConfirmationData): Promise<boolean> => {
  try {
    console.log('📱 Sending WhatsApp confirmation...');

    const response = await fetch(`${API_BASE_URL}/api/whatsapp/send-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send WhatsApp message');
    }

    const result = await response.json();
    console.log('✅ WhatsApp confirmation sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Error sending WhatsApp confirmation:', error);
    // Don't throw - let the user continue even if WhatsApp fails
    return false;
  }
};

/**
 * Send WhatsApp message to user only
 */
export const sendWhatsAppToUser = async (
  phoneNumber: string,
  firstName: string,
  lastName: string,
  referenceNumber: string,
  registrationDate: string,
  service: string
): Promise<boolean> => {
  try {
    console.log('📱 Sending WhatsApp to user...');

    const response = await fetch(`${API_BASE_URL}/api/whatsapp/send-user-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        firstName,
        lastName,
        referenceNumber,
        registrationDate,
        service
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send WhatsApp message');
    }

    console.log('✅ WhatsApp sent to user');
    return true;
  } catch (error) {
    console.error('❌ Error sending WhatsApp to user:', error);
    return false;
  }
};

/**
 * Send WhatsApp notification to admin only
 */
export const sendWhatsAppToAdmin = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  company: string,
  country: string,
  city: string,
  referenceNumber: string,
  registrationDate: string,
  service: string,
  paymentStatus?: string
): Promise<boolean> => {
  try {
    console.log('📱 Sending WhatsApp to admin...');

    const response = await fetch(`${API_BASE_URL}/api/whatsapp/send-admin-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        company,
        country,
        city,
        referenceNumber,
        registrationDate,
        service,
        paymentStatus
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send WhatsApp message');
    }

    console.log('✅ WhatsApp sent to admin');
    return true;
  } catch (error) {
    console.error('❌ Error sending WhatsApp to admin:', error);
    return false;
  }
};
