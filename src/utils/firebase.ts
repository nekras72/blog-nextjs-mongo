// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "blog-e5996.firebaseapp.com",
    projectId: "blog-e5996",
    storageBucket: "blog-e5996.appspot.com",
    messagingSenderId: "10285488827",
    appId: "1:10285488827:web:56da11097dfd1ecefa279e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;