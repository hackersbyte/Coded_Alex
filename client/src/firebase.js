

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "coded-blog.firebaseapp.com",
  projectId: "coded-blog",
  storageBucket: "coded-blog.appspot.com",
  messagingSenderId: "600522619730",
  appId: "1:600522619730:web:66387c8fd86dee4fdd588b",
  measurementId: "G-C9EZDVD8QT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);