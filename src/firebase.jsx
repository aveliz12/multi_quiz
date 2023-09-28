// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBshFqXGREC1g46DwHwFk3yepBexf5VXxA",
  authDomain: "questions-6f083.firebaseapp.com",
  projectId: "questions-6f083",
  storageBucket: "questions-6f083.appspot.com",
  messagingSenderId: "877128337669",
  appId: "1:877128337669:web:19a01e47d8a59da87d4f6c",
  measurementId: "G-8VW7RVKTBD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
