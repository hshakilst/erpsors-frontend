// import fetcher from "@/libs/fetcher";
import withSession from "@/libs/withSession";
import initFirebase from "@/libs/initFirebase";
import firebase from "firebase/app";
import "firebase/auth";

export default withSession(async (req, res) => {
  const { name } = await req.body;
  const { email } = await req.body;
  const { password } = await req.body;
  Promise.all([name, email, password]);
  initFirebase();

  try {
    const credentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const sentEmailVerification = await firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    const user = {
      isLoggedIn: true,
      id: credentials.user.uid,
      email: credentials.user.email,
      token: credentials.user.getIdToken,
      sentEmailVerification: sentEmailVerification,
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
