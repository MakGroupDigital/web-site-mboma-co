import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBKJUl5kCvVVfwZW6J7QGy_PtGTiHRUO4Y',
  authDomain: 'studio-7989313016-fb1dd.firebaseapp.com',
  projectId: 'studio-7989313016-fb1dd',
  storageBucket: 'studio-7989313016-fb1dd.firebasestorage.app',
  messagingSenderId: '1068181705143',
  appId: '1:1068181705143:web:9aa4ccbb0aab4c7e2b5832'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
// Specify the region where Cloud Functions are deployed
export const functions = getFunctions(app, 'us-central1');

export default app;
