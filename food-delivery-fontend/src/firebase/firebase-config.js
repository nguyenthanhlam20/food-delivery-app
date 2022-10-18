// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4VTqOyApaiupV7HtJAqNlirmJGjbVdPU",
  authDomain: "food-delivery-app-12f53.firebaseapp.com",
  projectId: "food-delivery-app-12f53",
  storageBucket: "food-delivery-app-12f53.appspot.com",
  messagingSenderId: "418147631931",
  appId: "1:418147631931:web:d18b11f6539b2a5f8ead1e",
  measurementId: "G-Q3EE349GT9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase storage reference
const storage = getStorage(app);

export default storage;
