// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';  // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgjgIVl7J9EmbRZz8CyIiJoVvPu0kfd2w",
  authDomain: "technook-9c349.firebaseapp.com",
  projectId: "technook-9c349",
  storageBucket: "technook-9c349.appspot.com",
  messagingSenderId: "217165471252",
  appId: "1:217165471252:web:49ba8d5670811cdd5b9101",
  measurementId: "G-PMEBNQ463K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const firestore = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

export { auth, firestore, storage };  // Export the storage reference
