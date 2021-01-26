import BaseLayout from "@/components/layouts/baseLayout";
import useUser from "@/libs/useUser";
import Skeleton from "@material-ui/lab/Skeleton";

const Verification = ({ user, error }) => {
  // const { user, error } = useUser();
  // if (error) return <h1>Error Page</h1>;
  // else if (user?.isLoggedIn === true && user?.isEmailVerified === false)
  //   return (
  //     <BaseLayout className="dashboard">
  //       <h1>Welcone to verification page!</h1>
  //       <h3>{JSON.stringify(user)}</h3>
  //     </BaseLayout>
  //   );
  // else {
  return (
    <BaseLayout className="dashboard">
      <h1>Welcone to verification page!</h1>
      <h3>{JSON.stringify(user ? user : error)}</h3>
    </BaseLayout>
  );
  // }
};

export const getStaticProps = async function (ctx) {
  const { user, error } = useUser();
  if (error) return { props: { error: error } };
  else if (user) return { props: { user: user } };
  else if (user?.isLoggedIn === true && user?.isEmailVerified === true) {
    return {
      props: {},
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  else {
    
  }
};

export default Verification;
