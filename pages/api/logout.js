import withSession from "@/libs/withSession";

export default withSession(async (req, res) => {
  try {
    req.session.destroy();
    res.json({ error: false, data:"Sign out succeeded!" });
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: true, data: error }));
  }
});
