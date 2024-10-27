import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "gymme-9c815.firebaseapp.com",
  projectId: "gymme-9c815",
  storageBucket: "gymme-9c815.appspot.com",
  messagingSenderId: "618395404758",
  appId: "1:618395404758:web:77315c51f62a798165fc77",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
