import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDO5yeDkWleujuzcSAyc9AJr6wJ26b_jhA",
  authDomain: "fir-crud-92d7b.firebaseapp.com",
  projectId: "fir-crud-92d7b",
  storageBucket: "fir-crud-92d7b.firebasestorage.app",
  messagingSenderId: "700213081252",
  appId: "1:700213081252:web:367367a81ad8da619e6231",
  measurementId: "G-GKSKHFT7H5"
};


const firebaseConfigApp = initializeApp(firebaseConfig);
export default firebaseConfigApp