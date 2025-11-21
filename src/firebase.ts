import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase config: prefer `import.meta.env` variables for security and flexibility.
// The hardcoded object below acts as a fallback when env vars are not set (e.g. quick local paste).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAe97AXLKdN4vWB3QIp6eJS7f4tgzJuzys",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "savi-ef593.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "savi-ef593",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "savi-ef593.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "154216336548",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:154216336548:web:b1514b9b047d0959972a31",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HLM3J7CCMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (wrap in try/catch for non-browser environments)
let analytics: any = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // Analytics may fail to initialize in non-browser environments (SSR, tests)
}

// Initialize Firebase Authentication and Cloud Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export { analytics };

export default app;
