// firebase.controller.js
import * as firebase from 'firebase/app';
import 'firebase/auth';

function filterConfig(config) {
  // Your filtering logic here
  const filteredConfig = { ...config };
  delete filteredConfig.apiKey;
  return filteredConfig;
}

export function initializeFirebase() {
  // Initialize Firebase with your configuration
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_API_KEY,
    authDomain: process.env.FIREBASE_API_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_API_PROJECT_ID,
    storageBucket: process.env.FIREBASE_API_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_API_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_API_APP_ID,
    measurementId: process.env.FIREBASE_API_MEASUREMENT_ID,
  });

  return firebase.app();
}
