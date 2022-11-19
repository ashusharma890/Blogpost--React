// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-aK79GvQS25HsgA-05oXJu5kmr7fglPM",
  authDomain: "blogpost-fbe1e.firebaseapp.com",
  projectId: "blogpost-fbe1e",
  storageBucket: "blogpost-fbe1e.appspot.com",
  messagingSenderId: "227985613053",
  appId: "1:227985613053:web:408445c7692d6597de9e94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
