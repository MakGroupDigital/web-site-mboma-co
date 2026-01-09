import { db } from './firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export interface AuditRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  auditType: string;
  message: string;
  referenceNumber: string;
  submissionDate: string;
  status: 'new' | 'in_progress' | 'completed';
}

/**
 * Save audit request to Firestore
 */
export const saveAuditRequest = async (data: AuditRequest): Promise<string> => {
  try {
    console.log('📝 Saving audit request to Firestore...');

    const docRef = await addDoc(collection(db, 'audit_requests'), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('✅ Audit request saved:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving audit request:', error);
    throw error;
  }
};

/**
 * Send audit confirmation email via Cloud Function
 */
export const sendAuditConfirmationEmail = async (data: AuditRequest): Promise<void> => {
  try {
    console.log('📧 Sending audit confirmation email via Cloud Function...');

    const sendEmail = httpsCallable(functions, 'sendAuditConfirmation');
    await sendEmail({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || 'N/A',
      company: data.company,
      auditType: data.auditType,
      message: data.message,
      referenceNumber: data.referenceNumber,
      submissionDate: data.submissionDate
    });

    console.log('✅ Audit confirmation email sent');
  } catch (error) {
    console.error('❌ Error sending audit email:', error);
    // Don't throw - let the user continue even if email fails
  }
};

/**
 * Get audit request by reference number
 */
export const getAuditByReference = async (
  referenceNumber: string
): Promise<AuditRequest | null> => {
  try {
    const q = query(
      collection(db, 'audit_requests'),
      where('referenceNumber', '==', referenceNumber)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return doc.data() as AuditRequest;
  } catch (error) {
    console.error('❌ Error getting audit request:', error);
    throw error;
  }
};

/**
 * Get all audit requests (admin)
 */
export const getAllAuditRequests = async (): Promise<AuditRequest[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'audit_requests'));
    return querySnapshot.docs.map(doc => doc.data() as AuditRequest);
  } catch (error) {
    console.error('❌ Error getting audit requests:', error);
    throw error;
  }
};
