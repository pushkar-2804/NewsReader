import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOBiP3igSCTNviSmOURQBVJ6wZF9YD4T8",
  authDomain: "vidutopia-2049b.firebaseapp.com",
  projectId: "vidutopia-2049b",
  storageBucket: "vidutopia-2049b.appspot.com",
  messagingSenderId: "1037044873225",
  appId: "1:1037044873225:web:23bb95bbe57ddfbbd760d8",
  measurementId: "G-PFW6TTNT5C",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the authentication and firestore instances
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useFirestore = () => {
  return firebase.firestore();
};

export default firebase;
