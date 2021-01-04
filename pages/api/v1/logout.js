import withSession from "@/libs/withSession";
import initFirebase from "@/libs/initFirebase";
import firebase from "firebase/app";
import "firebase/auth";

export default withSession(async (req, res) => {
  initFirebase();
  await firebase.auth().signOut();
  req.session.destroy();
  res.json({ isLoggedIn: false });
});
