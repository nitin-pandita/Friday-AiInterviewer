// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ7hTAE2BH66y0okqqKJO8P6DWf7epSfc",
  authDomain: "friday-aiinterviewer.firebaseapp.com",
  projectId: "friday-aiinterviewer",
  storageBucket: "friday-aiinterviewer.firebasestorage.app",
  messagingSenderId: "1051099307090",
  appId: "1:1051099307090:web:d586394cf9d62074e7538b",
  measurementId: "G-E8J7WTMJXG",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
