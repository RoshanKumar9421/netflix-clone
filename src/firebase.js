

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA7Gd6LU58WKnlZN18EfRd8HJhdO7l8bzw",
  authDomain: "netflix-clone-29b1a.firebaseapp.com",
  projectId: "netflix-clone-29b1a",
  storageBucket: "netflix-clone-29b1a.firebasestorage.app",
  messagingSenderId: "1053790598604",
  appId: "1:1053790598604:web:586f9be1b943652f47d969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ FIXED signUp
const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // ✅ Optionally update display name
    if (name) {
      await updateProfile(user, { displayName: name });
    }

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Account created successfully!");
    return user;
  } catch (error) {
    console.error(error);
    // ✅ Safe error handling
    if (error.code) {
      toast.error(error.code.split('/')[1].split('-').join(" "));
    } else {
      toast.error("Unknown error occurred");
    }
  }
};

// ✅ FIXED login (now accepts email + password)
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
    return res.user;
  } catch (error) {
    console.error(error);
    if (error.code) {
      toast.error(error.code.split('/')[1].split('-').join(" "));
    } else {
      toast.error("Unknown error occurred");
    }
  }
};

const logout = () => {
  signOut(auth);
  toast.info("Logged out successfully!");
};

export { auth, db, login, signUp, logout };
