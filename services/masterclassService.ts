import { db, storage } from './firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export interface MasterclassRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  city: string;
  referenceNumber: string;
  registrationDate: string;
  paymentStatus: 'pending' | 'completed' | 'office';
  transactionId?: string;
  paymentDate?: string;
  registrationPdfUrl?: string;
  receiptPdfUrl?: string;
}

/**
 * Save masterclass registration to Firestore
 */
export const saveMasterclassRegistration = async (
  data: MasterclassRegistration
): Promise<string> => {
  try {
    console.log('📝 Saving masterclass registration to Firestore...');

    const docRef = await addDoc(collection(db, 'masterclass_registrations'), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('✅ Registration saved:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving registration:', error);
    throw error;
  }
};

/**
 * Upload PDF to Firebase Storage
 */
export const uploadPdfToStorage = async (
  pdfBlob: Blob,
  fileName: string,
  referenceNumber: string
): Promise<string> => {
  try {
    console.log('📤 Uploading PDF to Storage...');

    const storageRef = ref(storage, `masterclass/${referenceNumber}/${fileName}`);
    await uploadBytes(storageRef, pdfBlob);
    const downloadUrl = await getDownloadURL(storageRef);

    console.log('✅ PDF uploaded:', downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error('❌ Error uploading PDF:', error);
    throw error;
  }
};

/**
 * Update registration with PDF URLs
 */
export const updateRegistrationWithPdfs = async (
  registrationId: string,
  registrationPdfUrl: string,
  receiptPdfUrl?: string
): Promise<void> => {
  try {
    console.log('🔄 Updating registration with PDF URLs...');

    const registrationRef = doc(db, 'masterclass_registrations', registrationId);
    await updateDoc(registrationRef, {
      registrationPdfUrl,
      receiptPdfUrl: receiptPdfUrl || null,
      updatedAt: new Date()
    });

    console.log('✅ Registration updated with PDFs');
  } catch (error) {
    console.error('❌ Error updating registration:', error);
    throw error;
  }
};

/**
 * Send confirmation email via Cloud Function
 */
export const sendConfirmationEmail = async (
  registrationId: string,
  data: MasterclassRegistration
): Promise<void> => {
  try {
    console.log('📧 Sending confirmation email via Cloud Function...');

    const sendEmail = httpsCallable(functions, 'sendMasterclassConfirmation');
    await sendEmail({
      registrationId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      country: data.country,
      city: data.city,
      referenceNumber: data.referenceNumber,
      registrationDate: data.registrationDate,
      paymentStatus: data.paymentStatus,
      registrationPdfUrl: data.registrationPdfUrl,
      receiptPdfUrl: data.receiptPdfUrl
    });

    console.log('✅ Confirmation email sent');
  } catch (error) {
    console.error('❌ Error sending email:', error);
    // Don't throw - let the user continue even if email fails
  }
};

/**
 * Get registration by reference number
 */
export const getRegistrationByReference = async (
  referenceNumber: string
): Promise<MasterclassRegistration | null> => {
  try {
    const q = query(
      collection(db, 'masterclass_registrations'),
      where('referenceNumber', '==', referenceNumber)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return doc.data() as MasterclassRegistration;
  } catch (error) {
    console.error('❌ Error getting registration:', error);
    throw error;
  }
};

/**
 * Get all registrations (admin)
 */
export const getAllRegistrations = async (): Promise<MasterclassRegistration[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'masterclass_registrations'));
    return querySnapshot.docs.map(doc => doc.data() as MasterclassRegistration);
  } catch (error) {
    console.error('❌ Error getting registrations:', error);
    throw error;
  }
};
