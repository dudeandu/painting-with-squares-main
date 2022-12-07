// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu41joi01eTTnQ6foP5dSxoZK-xkneMvE",
  authDomain: "collab-square-painting.firebaseapp.com",
  projectId: "collab-square-painting",
  storageBucket: "collab-square-painting.appspot.com",
  messagingSenderId: "213234723838",
  appId: "1:213234723838:web:60f90c9e58aaa32fad2eaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;