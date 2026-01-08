import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  city: string;
  referenceNumber: string;
  registrationDate: string;
}

export interface PaymentData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  amount: number;
  currency: string;
  paymentDate: string;
  transactionId: string;
  referenceNumber: string;
}

// Generate QR Code as data URL
export const generateQRCode = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      width: 200,
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

// Generate Registration Certificate PDF
export const generateRegistrationPDF = async (data: RegistrationData): Promise<void> => {
  try {
    const qrCodeUrl = await generateQRCode(
      `https://mboma.org/verify/registration/${data.referenceNumber}`
    );

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Background color
    pdf.setFillColor(245, 245, 245);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header with company branding
    pdf.setFillColor(110, 143, 58); // institutional-green
    pdf.rect(0, 0, pageWidth, 40, 'F');

    // Company name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('MboMa & Co.', pageWidth / 2, 15, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Institution Panafricaine', pageWidth / 2, 25, { align: 'center' });

    // Main content
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Fiche d\'Inscription', pageWidth / 2, 55, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Masterclass Exclusive 2026', pageWidth / 2, 62, { align: 'center' });

    // Reference number
    pdf.setFontSize(9);
    pdf.setTextColor(110, 143, 58);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Numéro de Référence: ${data.referenceNumber}`, 20, 75);

    // User information
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Informations Personnelles', 20, 90);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const infoY = 100;
    const lineHeight = 8;

    pdf.text(`Prénom: ${data.firstName}`, 20, infoY);
    pdf.text(`Nom: ${data.lastName}`, 20, infoY + lineHeight);
    pdf.text(`Email: ${data.email}`, 20, infoY + lineHeight * 2);
    pdf.text(`Entreprise/Projet: ${data.company}`, 20, infoY + lineHeight * 3);
    pdf.text(`Téléphone: ${data.phone}`, 20, infoY + lineHeight * 4);
    pdf.text(`Pays: ${data.country}`, 20, infoY + lineHeight * 5);
    pdf.text(`Ville: ${data.city}`, 20, infoY + lineHeight * 6);
    pdf.text(`Date d'inscription: ${data.registrationDate}`, 20, infoY + lineHeight * 7);

    // Event details
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Détails de l\'Événement', 20, infoY + lineHeight * 9);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const eventY = infoY + lineHeight * 10;
    pdf.text('Masterclass: Dormez & Gagnez', 20, eventY);
    pdf.text('Dates: 19-21 Février 2026', 20, eventY + lineHeight);
    pdf.text('Horaires: 17h00-19h30', 20, eventY + lineHeight * 2);
    pdf.text('Format: En ligne & Présentiel (Kinshasa)', 20, eventY + lineHeight * 3);

    // QR Code
    const qrSize = 40;
    const qrX = pageWidth - qrSize - 20;
    const qrY = eventY;
    pdf.addImage(qrCodeUrl, 'PNG', qrX, qrY, qrSize, qrSize);

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Cet document confirme votre inscription à la masterclass.', pageWidth / 2, pageHeight - 20, { align: 'center' });
    pdf.text('Pour plus d\'informations: contact@mboma.org | www.mboma.org', pageWidth / 2, pageHeight - 15, { align: 'center' });

    // Border
    pdf.setDrawColor(110, 143, 58);
    pdf.setLineWidth(0.5);
    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Save PDF
    pdf.save(`Fiche_Inscription_${data.referenceNumber}.pdf`);
  } catch (error) {
    console.error('Error generating registration PDF:', error);
    throw error;
  }
};

// Generate Payment Receipt PDF
export const generatePaymentReceiptPDF = async (data: PaymentData): Promise<void> => {
  try {
    const qrCodeUrl = await generateQRCode(
      `https://mboma.org/verify/payment/${data.transactionId}`
    );

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Background color
    pdf.setFillColor(245, 245, 245);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header with company branding
    pdf.setFillColor(255, 140, 0); // institutional-orange
    pdf.rect(0, 0, pageWidth, 40, 'F');

    // Company name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('MboMa & Co.', pageWidth / 2, 15, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Reçu de Paiement', pageWidth / 2, 25, { align: 'center' });

    // Main content
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Reçu de Paiement', pageWidth / 2, 55, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Masterclass Exclusive 2026', pageWidth / 2, 62, { align: 'center' });

    // Transaction details
    pdf.setFontSize(9);
    pdf.setTextColor(255, 140, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`ID Transaction: ${data.transactionId}`, 20, 75);
    pdf.text(`Numéro de Référence: ${data.referenceNumber}`, 20, 82);

    // User information
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Informations du Participant', 20, 95);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const infoY = 105;
    const lineHeight = 8;

    pdf.text(`Nom: ${data.firstName} ${data.lastName}`, 20, infoY);
    pdf.text(`Email: ${data.email}`, 20, infoY + lineHeight);
    pdf.text(`Entreprise: ${data.company}`, 20, infoY + lineHeight * 2);

    // Payment details
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Détails du Paiement', 20, infoY + lineHeight * 4);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const paymentY = infoY + lineHeight * 5;
    pdf.text(`Montant: ${data.amount} ${data.currency}`, 20, paymentY);
    pdf.text(`Date de Paiement: ${data.paymentDate}`, 20, paymentY + lineHeight);
    pdf.text('Statut: Paiement Confirmé', 20, paymentY + lineHeight * 2);

    // Event details
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Accès à l\'Événement', 20, paymentY + lineHeight * 4);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const eventY = paymentY + lineHeight * 5;
    pdf.text('Masterclass: Dormez & Gagnez', 20, eventY);
    pdf.text('Dates: 19-21 Février 2026', 20, eventY + lineHeight);
    pdf.text('Horaires: 17h00-19h30', 20, eventY + lineHeight * 2);

    // QR Code
    const qrSize = 40;
    const qrX = pageWidth - qrSize - 20;
    const qrY = eventY;
    pdf.addImage(qrCodeUrl, 'PNG', qrX, qrY, qrSize, qrSize);

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Merci pour votre participation!', pageWidth / 2, pageHeight - 20, { align: 'center' });
    pdf.text('Pour plus d\'informations: contact@mboma.org | www.mboma.org', pageWidth / 2, pageHeight - 15, { align: 'center' });

    // Border
    pdf.setDrawColor(255, 140, 0);
    pdf.setLineWidth(0.5);
    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Save PDF
    pdf.save(`Recu_Paiement_${data.transactionId}.pdf`);
  } catch (error) {
    console.error('Error generating payment receipt PDF:', error);
    throw error;
  }
};

// Download with fallback for Safari mobile
export const downloadPDFWithFallback = async (
  generatePdfFn: () => Promise<void>,
  fileName: string
): Promise<void> => {
  try {
    // Try direct download
    await generatePdfFn();
  } catch (error) {
    console.error('Direct download failed, trying fallback:', error);
    
    // Fallback: Create blob and use alternative methods
    try {
      const canvas = await html2canvas(document.body);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      
      // Try blob download
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (fallbackError) {
      console.error('Fallback download also failed:', fallbackError);
      throw fallbackError;
    }
  }
};
