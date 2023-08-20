// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyB896pvCZwGVU5RUIWBIVzUAtTllNAu0n8",
//   authDomain: "fir-auth-1132.firebaseapp.com",
//   projectId: "fir-auth-1132",
//   storageBucket: "fir-auth-1132.appspot.com",
//   messagingSenderId: "1029021654707",
//   appId: "1:1029021654707:web:14aa4dee98449061701ac6",
//   measurementId: "G-MFP6M081T7",
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth();

// export { app, auth };
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXG_hHfnuSRS7FkhgBZcnKlbBiyNgnxsI",
  authDomain: "ai-image-generator-d57bb.firebaseapp.com",
  projectId: "ai-image-generator-d57bb",
  storageBucket: "ai-image-generator-d57bb.appspot.com",
  messagingSenderId: "1077431942394",
  appId: "1:1077431942394:web:de23b480516592abdc5d43",
  measurementId: "G-7PKY2VH80R",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the authentication and firestore instances
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
