// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYkekAoY9y3pBzj3IQYGyriUygZXEWJ84",
  authDomain: "browseclimate.firebaseapp.com",
  projectId: "browseclimate",
  storageBucket: "browseclimate.appspot.com",
  messagingSenderId: "145552178268",
  appId: "1:145552178268:web:150a388b24f06b18a4fa99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)