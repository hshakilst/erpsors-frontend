import * as admin from "firebase-admin";

var serviceAccount = require("./serviceAccountKey.json");

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://nextjs-demo-2d0c5.firebaseio.com",
    });
  }
} catch (error) {
  console.error(error);
}

export default admin;
