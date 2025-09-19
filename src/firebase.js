import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTFQjrSpzW33crh8nzrFqYzspYh6jknLM",
  authDomain: "singhdomanimaliarescue.firebaseapp.com",
  projectId: "singhdomanimaliarescue",
  storageBucket: "singhdomanimaliarescue.firebasestorage.app",
  messagingSenderId: "388037843724",
  appId: "1:388037843724:web:7042dc6b4aa61ed8c18729",
  measurementId: "G-0EDYK51V7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;