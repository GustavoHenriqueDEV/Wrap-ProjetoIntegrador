import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDZlaoSveENkGZR4O3pKm7uMg5xSYO9us",
  authDomain: "pani-5d6e0.firebaseapp.com",
  projectId: "pani-5d6e0",
  storageBucket: "pani-5d6e0.appspot.com",
  messagingSenderId: "831180523868",
  appId: "1:831180523868:web:691ceb73f5addfbc7e1999",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const profileCollection = db.collection("profile");
const tasksCollection = db.collection("tasks");

export { db, auth, profileCollection, tasksCollection };
