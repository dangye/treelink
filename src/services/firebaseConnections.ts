// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARXqjSyDfEV8thoKCY_tVUqaMLpAdih2Y",
  authDomain: "reactlinkstree.firebaseapp.com",
  projectId: "reactlinkstree",
  storageBucket: "reactlinkstree.firebasestorage.app",
  messagingSenderId: "349584957604",
  appId: "1:349584957604:web:4ad0e00afe737dd652c631",
  measurementId: "G-XHKQ8BGXQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
//const analytics = getAnalytics(app);

export {auth, db}