import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs, getFirestore, query, where, collection, updateDoc } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storageDb = getStorage(app);

// Function to fetch product info by ID
const getProductInfo = async (id) => {
    try {
        const docRef = doc(db, "Products", id);
        const productSnapshot = await getDoc(docRef);
        
        if (productSnapshot.exists()) {
            return { id: productSnapshot.id, ...productSnapshot.data() };
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching product data:", error);
        return null;
    }
};

// Function to fetch bids associated with a specific product ID
const getProductBids = async (productId) => {
    try {
        const bidCollectionRef = collection(db, "bids");
        const q = query(bidCollectionRef, where("productId", "==", productId));
        const querySnapshot = await getDocs(q);
        
        const bids = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return bids;
    } catch (error) {
        console.error("Error fetching bids:", error);
        throw error; // Rethrow to catch in the component
    }
};

// Function to update the status of a bid
const updateBidStatus = async (bidId, status) => {
    try {
        const bidDocRef = doc(db, "bids", bidId);
        await updateDoc(bidDocRef, { status });
        return { success: true };
    } catch (error) {
        console.error("Error updating bid status:", error);
        return { success: false, error: error.message };
    }
};

// Function to fetch all bids made by a specific user
const getUserBids = async (userId) => {
    try {
        const bidCollectionRef = collection(db, "bids");
        const q = query(bidCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching user bids:", error);
        throw error; // Rethrow to catch in the component
    }
};

// Exporting functions and instances
export { auth, getProductBids, db, storageDb, analytics, getProductInfo, updateBidStatus, getUserBids };
