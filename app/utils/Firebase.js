import firebase from "firebase/compat/app";
import "firebase/compat/auth";

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
export const auth = firebase.auth();

export default firebase;
