import withSession from '@/libs/withSession'
import admin from '@/libs/firebase/firebaseAdmin'

export default withSession(async (req, res) => {
  try {
    const { idToken } = await req.body
    //TODO:Implement csrf token
    // const csrfToken = req.body.csrfToken.toString();
    // Guard against CSRF attacks.
    // if (csrfToken !== req.cookies.csrfToken) {
    //   res.status(401).send("UNAUTHORIZED REQUEST!");
    //   return;
    // }
    // Set session expiration to 5 days.
    if (idToken) {
      const expiresIn = 60 * 60 * 24 * 5 * 1000
      const decodedIdToken = await admin.auth().verifyIdToken(idToken)
      if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
        const sessionCookie = await admin
          .auth()
          .createSessionCookie(idToken, { expiresIn })
        req.session.set('sessionCookie', sessionCookie)
        await req.session.save()
        res
          .status(200)
          .end(JSON.stringify({ error: false, data: 'Sign in succeeded!' }))
      }
      res
        .status(401)
        .end(JSON.stringify({ error: true, data: 'Recent sign in required!' }))
    } else
      res.status(401).end(JSON.stringify({ error: true, data: 'Bad Request!' }))
  } catch (error) {
    res.status(500).end(JSON.stringify({ error: true, data: error }))
  }
})
