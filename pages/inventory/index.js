import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import { useTheme } from "@material-ui/core/styles";

const Index = (props) => {
  const theme = useTheme();

  return <h1>Inventory Index</h1>;
};

export default withPageAuthRequired(Index);
