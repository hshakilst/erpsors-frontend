import React, { useContext, createContext } from "react";
import firebaseAuthDef from "@/libs/firebase/firebaseAuthDef";
import BaseLayout from "@/components/layouts/baseLayout";
import Redirect from "@/components/shared/redirect";
import { useGetUser } from "@/actions/user";
import Skeleton from "@material-ui/lab/Skeleton";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = firebaseAuthDef();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const withAuthUser = (Component) => {
  return (props) => {
    const [user, setUser] = React.useState(null);
    const { data, error, loading } = useGetUser();

    React.useEffect(() => {
      if (data) setUser(data.data);
    }, [data]);
    if (error) return <Redirect to={"/login"} ssr={true}></Redirect>;
    if (loading)
      return (
        <BaseLayout className="dashboard">
          <Skeleton variant="text" animation="wave" width="40ch" height="7ch" />
          <Skeleton variant="text" animation="wave" width="40ch" height="5ch" />
          <Skeleton variant="text" animation="wave" width="40ch" height="5ch" />
          <Skeleton variant="text" animation="wave" width="40ch" height="5ch" />
        </BaseLayout>
      );
    if (!user?.emailVerified)
      return (
        <BaseLayout className="dashboard">
          <h3>Your account is not verified yet!</h3>
        </BaseLayout>
      );
    return <Component user={user} {...props}></Component>;
  };
};

// export const useAuthorization = (getData) => async ({ req, res }) => {
//   const sessionCookie = req.session.get("sessionCookie");

//   /**{"iss":"https://session.firebase.google.com/nextjs-demo-2d0c5",
//    * "aud":"nextjs-demo-2d0c5","auth_time":1611389661,
//    * "user_id":"JVgJxBcTyGfcnBY2VaUwyw65BmI3",
//    * "sub":"JVgJxBcTyGfcnBY2VaUwyw65BmI3","iat":1611389667,"exp":1611821667,
//    * "email":"hshakilst@gmail.com","email_verified":false,
//    * "firebase":{"identities":{"email":["hshakilst@gmail.com"]},
//    * "sign_in_provider":"password"},"uid":"JVgJxBcTyGfcnBY2VaUwyw65BmI3"} */

//   const user = await admin.auth().verifySessionCookie(sessionCookie, true);
//   if (!session || !session.user) {
//     res.writeHead(302, {
//       Location: "/api/login",
//     });
//     res.end();
//     return { props: {} };
//   }

//   const data = getData ? await getData({ req, res }, session.user) : {};

//   return { props: { user: session.user, ...data } };
// };
