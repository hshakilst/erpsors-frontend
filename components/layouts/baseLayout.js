import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";

const BaseLayout = (props) => {
  return (
    <NoSsr>
      <CssBaseline>{props.children}</CssBaseline>
    </NoSsr>
  );
};

export default BaseLayout;
