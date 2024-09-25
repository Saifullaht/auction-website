 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 import { getAuth } from "firebase/auth";
import {    getFirestore } from "firebase/firestore";
import {   getStorage } from "firebase/storage";
import App from "../App";
 
 
const firebaseConfig = {
  apiKey: "AIzaSyDTO-ymd1MTBBthMBcxh-AAFTWNKfrU7z0",
  authDomain: "auctionwebsite-40bc4.firebaseapp.com",
  databaseURL: "https://auctionwebsite-40bc4-default-rtdb.firebaseio.com",
  projectId: "auctionwebsite-40bc4",
  storageBucket: "auctionwebsite-40bc4.appspot.com",
  messagingSenderId: "952643225683",
  appId: "1:952643225683:web:ee8900f2bc556347585ea6",
  measurementId: "G-53LWVQNBRK"
};

 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics( app);
 
const db =  getFirestore( app);
 const auth = getAuth(app)
const  storageDb =   getStorage( app);
 
 export {auth,db, storageDb , analytics};