
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBF7EoW-mQvrnXzj_l0mNnnhzw8WTr2xD8",
  authDomain: "arknights-8d51f.firebaseapp.com",
  projectId: "arknights-8d51f",
  storageBucket: "arknights-8d51f.firebasestorage.app",
  messagingSenderId: "875296218391",
  appId: "1:875296218391:web:395828e666ec5768932b52"
  
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
