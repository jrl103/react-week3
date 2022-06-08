import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg-_l3ZQZKOGZOdhcfxL-1PlQrLI6rFj8",
  authDomain: "magazine-8d04e.firebaseapp.com",
  projectId: "magazine-8d04e",
  storageBucket: "magazine-8d04e.appspot.com",
  messagingSenderId: "583877270828",
  appId: "1:583877270828:web:7c4ce24d6f1e688b822089",
  measurementId: "G-MNYP2F2XFH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
