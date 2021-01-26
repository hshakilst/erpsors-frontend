import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import BaseLayout from "@/components/layouts/baseLayout";
import withSession from "@/libs/withSession";
import useUser from "@/libs/useUser";

const Dashboard = (props) => {
  // const { user, error } = useUser({ redirectTo: "/login" });
  // if (error) return <h1>Error Page</h1>;
  // if (user?.isLoggedIn === true && user?.isEmailVerified === true)
  //   return (
  //     <BaseLayout className="dashboard">
  //       <h1>Welcone to dashboard page!</h1>
  //       <h3>{JSON.stringify(user)}</h3>
  //     </BaseLayout>
  //   );
  // if (user?.isLoggedIn === true && user?.isEmailVerified === false)
  //   return (
  //     <BaseLayout className="dashboard">
  //       <h1>Please Verify Your Email</h1>
  //       <h3>{JSON.stringify(user)}</h3>
  //     </BaseLayout>
  //   );
  return (
    <BaseLayout className="dashboard">
      <h1>Welcone to dashboard page!</h1>
      <h3>{JSON.stringify(props.user)}</h3>
    </BaseLayout>
  );
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined || user.isLoggedIn === false) {
    // res.setHeader("location", "/login");
    // res.statusCode = 302;
    // res.end();
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (user.isEmailVerified === false) {
    res.setHeader("location", "/verification");
    res.statusCode = 302;
    res.end();
    return {
      props: {},
      redirect: {
        destination: "/verification",
        permanent: false,
      },
    };
  }

  return {
    props: { user: req.session.get("user") },
  };
});

export default Dashboard;
