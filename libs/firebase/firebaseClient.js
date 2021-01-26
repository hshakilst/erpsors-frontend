import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/analytics";
import "firebase/performance";

const config = {
  apiKey: "AIzaSyCd2WgvJW8PqlUcnAmAW9EwJoLBif2PH2c",
  authDomain: "nextjs-demo-2d0c5.firebaseapp.com",
  projectId: "nextjs-demo-2d0c5",
  storageBucket: "nextjs-demo-2d0c5.appspot.com",
  messagingSenderId: "358738102743",
  appId: "1:358738102743:web:c7f52199477e6bf8aaa392",
  measurementId: "G-FEBB7TL5RX",
};

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    if (typeof window !== "undefined") {
      firebase.analytics();
      firebase.performance();
    }
  }
} catch (err) {}

export default firebase;
