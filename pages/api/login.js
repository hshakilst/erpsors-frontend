import withSession from "@/libs/withSession";
import initFirebase from "@/libs/initFirebase";
import firebase from "firebase/app";
import "firebase/auth";

export default withSession(async (req, res) => {
  const { email } = await req.body;
  const { password } = await req.body;

  initFirebase();

  try {
    const credentials = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const user = {
      isLoggedIn: true,
      id: credentials.user.uid,
      email: credentials.user.email,
      token: credentials.user.getIdToken,
      isEmailVerified: credentials.user.emailVerified,
      name: credentials.user.displayName,
    };

    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(500).json(error);
  }
});
