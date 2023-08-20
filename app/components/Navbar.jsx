// components/Navbar.js
import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useAuth } from "../utils/Firebase";

const Navbar = () => {
  const { user } = useAuth();
  const handleSignInWithGoogle = () => {
    // Create a Google sign-in provider
    const provider = new firebase.auth.GoogleAuthProvider();

    // Sign in with Google using a popup window
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        // Handle sign-in errors if needed
        console.error(error);
      });
  };
  const handleSignOut = () => {
    // Sign out the current user
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        // Handle sign-out errors if needed
        console.error(error);
      });
  };

  return (
    <nav className="bg-blue-500 py-4 px-8 flex justify-between items-center">
      <h1 className="text-white text-xl font-semibold">News Reader App</h1>
      {user ? (
        <button
          className="bg-white text-blue-500 hover:bg-blue-100 py-2 px-4 rounded"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="bg-white text-blue-500 hover:bg-blue-100 py-2 px-4 rounded"
          onClick={handleSignInWithGoogle}
        >
          Sign In with Google
        </button>
      )}
    </nav>
  );
};

export default Navbar;
