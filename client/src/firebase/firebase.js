import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,RecaptchaVerifier } from 'firebase/auth'
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAQvs27WgLa1FIBSizNgoObZxqqC4kMGy8",
  authDomain: "otp-app-7a1e3.firebaseapp.com",
  projectId: "otp-app-7a1e3",
  storageBucket: "otp-app-7a1e3.appspot.com",
  messagingSenderId: "564550314466",
  appId: "1:564550314466:web:d003672e592c3110d831bb"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {auth, provider, RecaptchaVerifier}