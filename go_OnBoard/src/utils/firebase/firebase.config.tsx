import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  connectAuthEmulator,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env
    .VITE_APP_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID as string,
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage(app);

export const passwordReset = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

export const confirmThePasswordReset = async (
  oobCode: string,
  newPassword: string
) => {
  if (!oobCode && !newPassword) return;

  return await confirmPasswordReset(auth, oobCode, newPassword);
};
