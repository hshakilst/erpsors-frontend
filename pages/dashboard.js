import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import BaseLayout from "@/components/layouts/baseLayout";
import withSession from "@/libs/withSession";
import Redirect from "@/components/shared/redirect";
import { useGetUser } from "@/actions/user";
import { withAuthUser } from "@/libs/auth";

const Dashboard = (props) => {
  // const { data, error, loading } = useGetUser();
  // if (!data && loading)
  //   return (
  //     <BaseLayout className="dashboard">
  //       <h3>Loading...</h3>
  //     </BaseLayout>
  //   );
  // if (error) return <Redirect to={"/login"} ssr={true}></Redirect>;
  // if (!data?.data.emailVerified)
  //   return <Redirect to={"/verification"}></Redirect>;
  return (
    <BaseLayout className="dashboard">
      <h1>Welcome to dashboard page!</h1>
      <h3>{JSON.stringify(props.user)}</h3>
    </BaseLayout>
  );
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const sessionCookie = await req.session.get("sessionCookie");
  if (sessionCookie === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: {
      sessionCookie: sessionCookie,
    },
  };
});

export default withAuthUser(Dashboard);
