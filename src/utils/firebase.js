// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4OpNmaiPAHqzA-sxwcQSx6inRXICQyME",
  authDomain: "netflixgpt-cd251.firebaseapp.com",
  projectId: "netflixgpt-cd251",
  storageBucket: "netflixgpt-cd251.appspot.com",
  messagingSenderId: "884680009110",
  appId: "1:884680009110:web:7edebcad5b76ae5494a9b7",
  measurementId: "G-1T7S9KF8LQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();