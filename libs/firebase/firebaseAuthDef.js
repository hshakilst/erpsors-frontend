import { useState, useEffect } from "react";
import firebase from "@/libs/firebase/firebaseClient";
import fetch from "node-fetch";

const firebaseAuthDef = () => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        setUser(user);
        user
          .getIdToken()
          .then((idToken) => setIdToken(idToken))
          .catch((error) => console.log(error));
      }
      setUser(false);
      setIdToken(false);
    });
    return () => unsubscribe();
  }, []);

  const createUserWithEmailAndPassword = async (email, password) => {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const isVerificationSent = await sendEmailVerification();
      setUser(user);
      return {
        error: false,
        data:  "Register succeeded! But Verification email couldn't be sent!",
      };
    } catch (error) {
      return { error: true, data: error };
    }
  };

  const sessionLoginWithEmailAndPassword = async (email, password) => {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const idToken = await user.getIdToken();
      // Get the user's ID token as it is needed to exchange for a session cookie.
      // Session login endpoint is queried and the session cookie is set.
      // CSRF protection should be taken into account.
      // ...
      // const csrfToken = getCookie("csrfToken");
      setIdToken(idToken);
      console.log(idToken);
      const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify({ idToken: idToken }),
        headers: { "Content-Type": "application/json" },
      });
      await firebase.auth().signOut();
      return await res.json(); // login api returns {error, data}
    } catch (error) {
      console.log(error)
      return { error: true, data: error };
    }
  };

  const signInWithEmailAndPassword = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        return true;
      })
      .catch((error) => {
        setError(error);
        return false;
      });
  };

  const sendEmailVerification = () => {
    return firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => true)
      .catch((error) => false);
  };

  const updateProfile = ({ name, avatar }) => {
    return firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name,
        photoUrl: avatar,
      })
      .then(({ user }) => {
        setUser(user);
        return true;
      })
      .catch((error) => {
        setError(error);
        return false;
      });
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        return true;
      })
      .catch((error) => {
        setError(error);
        return false;
      });
  };

  const updatePassword = (newPassword) => {
    return firebase
      .auth()
      .currentUser.updatePassword(newPassword)
      .then(() => true)
      .catch((error) => {
        setError(error);
        return false;
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => true)
      .catch((error) => {
        setError(error);
        return false;
      });
  };

  const confirmPasswordReset = (code, newPassword) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, newPassword)
      .then(function () {
        return true;
      })
      .catch(function () {
        setError(error);
        return false;
      });
  };

  /**Returns email address after successful verification */
  const verifyPasswordResetCode = (code, userEmail) => {
    return firebase
      .auth()
      .verifyPasswordResetCode(code)
      .then((email) => {
        if (userEmail === email) return true;
        throw {
          errorCode: "emails-mismatch",
          errorMessage: "Emails don't match.",
        };
      })
      .catch((error) => {
        setError(error);
        return false;
      });
  };

  const reauthenticateWithEmailPopup = (privilegedTaskHandler) => {
    return firebase
      .auth()
      .currentUser.reauthenticateWithPopup(
        new firebase.auth.EmailAuthProvider()
      )
      .then((userCredential) => {
        privilegedTaskHandler(userCredential);
        return true;
      })
      .catch((error) => {
        serError(error);
        return false;
      });
  };

  return {
    user,
    idToken,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendEmailVerification,
    updatePassword,
    sendPasswordResetEmail,
    reauthenticateWithEmailPopup,
    confirmPasswordReset,
    verifyPasswordResetCode,
    sessionLoginWithEmailAndPassword,
  };
};

export default firebaseAuthDef;
