// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe97AXLKdN4vWB3QIp6eJS7f4tgzJuzys",
  authDomain: "savi-ef593.firebaseapp.com",
  projectId: "savi-ef593",
  storageBucket: "savi-ef593.firebasestorage.app",
  messagingSenderId: "154216336548",
  appId: "1:154216336548:web:b1514b9b047d0959972a31",
  measurementId: "G-HLM3J7CCMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);