// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpJEzrq6swveZNvM-WD0B0PcraSKCXC0c",
  authDomain: "ai-travel-planner-97bc2.firebaseapp.com",
  projectId: "ai-travel-planner-97bc2",
  storageBucket: "ai-travel-planner-97bc2.firebasestorage.app",
  messagingSenderId: "593027104919",
  appId: "1:593027104919:web:e07434e61229eecb6069d2",
  measurementId: "G-KC19F65TXF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
