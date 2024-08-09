// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiiv31Us5YJ9HKlq44eNA915oIKxEjAyA",
  authDomain: "cronio-d8c6b.firebaseapp.com",
  projectId: "cronio-d8c6b",
  storageBucket: "cronio-d8c6b.appspot.com",
  messagingSenderId: "513282904496",
  appId: "1:513282904496:web:568b859654bae3bc258675"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()
export const storage = getStorage()
