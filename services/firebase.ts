
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Live Firebase project configuration for real-d9183
const firebaseConfig = {
  apiKey: "AIzaSyBOM6N_W4AF7p8WFFZSOplpdKvmnU_zOEQ",
  authDomain: "real-d9183.firebaseapp.com",
  projectId: "real-d9183",
  storageBucket: "real-d9183.firebasestorage.app",
  messagingSenderId: "87995677982",
  appId: "1:87995677982:web:2bd4ec55775bb53d381d0f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
