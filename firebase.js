// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1WGfGyzG8nCbiRqKwLbmAqHiFuxf5QyY",
  authDomain: "majaffi-platform.firebaseapp.com",
  projectId: "majaffi-platform",
  storageBucket: "majaffi-platform.firebasestorage.app",
  messagingSenderId: "1044333099678",
  appId: "1:1044333099678:web:7a4bee30339f7d7033598f",
  measurementId: "G-4087HL56RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
