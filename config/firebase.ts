import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  projectId: "ju-cake",
  storageBucket: "***REMOVED***",
  messagingSenderId: "***REMOVED***",
  appId: "1:***REMOVED***:web:***REMOVED***",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
/* connectFirestoreEmulator(db, "localhost", 8080); */

export const auth = getAuth();
