// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPBtBO9A5fmijlrvA_tkXJUIcDdRJEgEc",
  authDomain: "lab2-advtopics.firebaseapp.com",
  projectId: "lab2-advtopics",
  storageBucket: "lab2-advtopics.appspot.com",
  messagingSenderId: "138297574651",
  appId: "1:138297574651:web:e5431bf8f644a896641c5e",
  measurementId: "G-T3JY84MLW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
