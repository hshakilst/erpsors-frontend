import withSession from "@/libs/withSession";
import admin from "@/libs/firebase/firebaseAdmin";
// import LogRocket from "logrocket";

// LogRocket.init("ogzvmk/demo");

export default withSession(async (req, res) => {
  const sessionCookie = await req.session.get("sessionCookie");
  try {
    if (sessionCookie) {
      const decodedClaims = await admin
        .auth()
        .verifySessionCookie(sessionCookie, true);
      const user = await admin.auth().getUser(decodedClaims.sub);
      res.status(200).json({ error: false, data: user });
    } else {
      res.status(401).json({ error: true, data: "Bad Request!" });
    }
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
});
