import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCRxj5TuXBO1uIVT2Teho9lUbG0rFngPSc",
  authDomain: "ca7o-js.firebaseapp.com",
  databaseURL: "https://ca7o-js.firebaseio.com",
  projectId: "ca7o-js",
  storageBucket: "ca7o-js.appspot.com",
  messagingSenderId: "404100090071",
  appId: "1:404100090071:web:27a2938a815b7cb8",
}

initializeApp(firebaseConfig)

export const db = getFirestore()

export const auth = getAuth()
export const googleAuthProvider = new GoogleAuthProvider()
export const signInWithGoogle = () => signInWithPopup(auth, googleAuthProvider)