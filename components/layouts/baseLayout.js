import Header from "@/components/shared/header";
import theme from "@/components/ui/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NoSsr from "@material-ui/core/NoSsr";

const BaseLayout = (props) => {
  return (
    <>
      <NoSsr>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <Container maxWidth="sm" className={props.className} {...props}>
              {props.children}
            </Container>
          </ThemeProvider>
        </CssBaseline>
      </NoSsr>
    </>
  );
};

export default BaseLayout;
