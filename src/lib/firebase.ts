import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCWdDqI7Uk8uKBY80Oy-vtsqpLFU00m9bM",
  authDomain: "mcc-carbon.firebaseapp.com",
  projectId: "mcc-carbon",
  storageBucket: "mcc-carbon.firebasestorage.app",
  messagingSenderId: "260261175727",
  appId: "1:260261175727:web:5cbec6c6b19b0a60accf5a"
};

// Inicializa o Firebase apenas uma vez
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
