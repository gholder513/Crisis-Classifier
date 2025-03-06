import firebase from "firebase/app";
import "firebase/auth";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

    const firebaseConfig = {
        apiKey: "AIzaSyACcnUKA1kaZRQf2PGSwzWsWx9SXsk-xag",
        authDomain: "crisis-classifier.firebaseapp.com",
        projectId: "crisis-classifier",
        storageBucket: "crisis-classifier.firebasestorage.app",
        messagingSenderId: "996995204555",
        appId: "1:996995204555:web:0cb86c751513563e15e24e",
        measurementId: "G-K4EF4RVFEN"
}; 

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider };