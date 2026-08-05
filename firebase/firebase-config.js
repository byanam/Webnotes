// firebase/firebase-config.js
// Firebase Web SDK (v10+ Modular) initialization

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// =========================================================================
// FIREBASE CONFIGURATION
// Replace the values below with your Firebase Project Credentials from:
// Firebase Console -> Project Settings -> General -> Your apps -> Web app
// =========================================================================
export const firebaseConfig = {
    apiKey: "AIzaSyC2rd9mf092NLx1rupJtY2CtwCDzQ7yZx4",
    authDomain: "login-note-taking.firebaseapp.com",
    projectId: "login-note-taking",
    storageBucket: "login-note-taking.firebasestorage.app",
    messagingSenderId: "298625053557",
    appId: "1:298625053557:web:24a17c8ca0c9f0d9a3993c"
};

// Initialize Firebase App instance
export const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
