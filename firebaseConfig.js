// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq0gsc9ODnPXnO8g0wh2bRLXFdmhklx10",
  authDomain: "goodnightsounds-d5cd5.firebaseapp.com",
  projectId: "goodnightsounds-d5cd5",
  storageBucket: "goodnightsounds-d5cd5.appspot.com",
  messagingSenderId: "149579889297",
  appId: "1:149579889297:web:86e82cb1919d2f3b6b5d30",
  measurementId: "G-SDXMK1HJWD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
