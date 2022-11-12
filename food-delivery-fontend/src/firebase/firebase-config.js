// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDV0h81Oxbry_b93SkA8gjBbmDN2xzMtd4",
  authDomain: "food-delivery-271.firebaseapp.com",
  projectId: "food-delivery-271",
  storageBucket: "food-delivery-271.appspot.com",
  messagingSenderId: "421891877541",
  appId: "1:421891877541:web:7145d48f557d1cf0927b4c",
  measurementId: "G-G0NRJMZNPR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase storage reference
const storage = getStorage(app);

export default storage;
