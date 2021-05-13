import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

const Index = (props) => {
  const { user, error, isLoading } = useUser();

  console.log(user);

  return <h1>Inventory Index</h1>;
};

export default withPageAuthRequired(Index);
