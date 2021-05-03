import withSession from "@/libs/withSession";
// import LogRocket from "logrocket";

// LogRocket.init("ogzvmk/demo");

export default withSession(async (req, res) => {
  try {
    req.session.destroy();
    res.json({ error: false, data: "Sign out succeeded!" });
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: true, data: error }));
  }
});
