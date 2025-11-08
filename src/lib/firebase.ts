import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZMyFJN7b8fNswdlenPoonHtUG_LPMMhQ",
  authDomain: "netflix-ef1fa.firebaseapp.com",
  projectId: "netflix-ef1fa",
  storageBucket: "netflix-ef1fa.firebasestorage.app",
  messagingSenderId: "720916672331",
  appId: "1:720916672331:web:d3d03d22c7aa26593602ce",
  measurementId: "G-1Q2VE8K372"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
