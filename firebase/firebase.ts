import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore, Timestamp } from "firebase/firestore"

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

const db = getFirestore()
const auth = getAuth()
const googleAuthProvider = new GoogleAuthProvider()
const signInWithGoogle = () => signInWithPopup(auth, googleAuthProvider)

const fromMillis = Timestamp.fromMillis

export { db, auth, googleAuthProvider, signInWithGoogle, fromMillis }
