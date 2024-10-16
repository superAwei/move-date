import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAgE8CSBMin5sxODMtnXeoimZVXQHUfbH0",
  authDomain: "movie-date-eadf6.firebaseapp.com",
  projectId: "movie-date-eadf6",
  storageBucket: "movie-date-eadf6.appspot.com",
  messagingSenderId: "761119718268",
  appId: "1:761119718268:web:ebe4bcee01727b8b4e82f9",
  measurementId: "G-BL35VJ3QSF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const analytics = getAnalytics(app);

export { auth, db, rtdb, analytics };
