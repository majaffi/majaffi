// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔴 PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyD9KTcTyfrXEb1OY1w_e2m8zwnyxNMcons",
  authDomain: "majaffi-venture2.firebaseapp.com",
  projectId: "majaffi-venture2",
  storageBucket: "majaffi-venture2.firebasestorage.app",
  messagingSenderId: "101326202999",
  appId: "1:101326202999:web:4825cd888f70549a223e72"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export { signInWithPopup, signOut, collection, addDoc, getDocs, doc, deleteDoc };

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9KTcTyfrXEb1OY1w_e2m8zwnyxNMcons",
  authDomain: "majaffi-venture2.firebaseapp.com",
  projectId: "majaffi-venture2",
  storageBucket: "majaffi-venture2.firebasestorage.app",
  messagingSenderId: "101326202999",
  appId: "1:101326202999:web:4825cd888f70549a223e72"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export { signInWithPopup, signOut, collection, addDoc, getDocs, doc, updateDoc, deleteDoc };