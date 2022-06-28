import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfRE6VXv_BorI82Ths7BWLVgyuzorGoSA",
  authDomain: "site-receita-149e7.firebaseapp.com",
  projectId: "site-receita-149e7",
  storageBucket: "site-receita-149e7.appspot.com",
  messagingSenderId: "714215294284",
  appId: "1:714215294284:web:591021635495b09d39fbe9",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const profileCollection = db.collection("profile");
const tasksCollection = db.collection("tasks");


export { db, auth, profileCollection, tasksCollection };
