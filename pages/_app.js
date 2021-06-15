import "@/styles/_fonts.css";
import "@/styles/_app.css";
import React from "react";
import StyledSnackbar from "@/components/ui/styledSnackbar";
import { ThemeProvider } from "@material-ui/styles";
import theme from "@/components/ui/theme";
import StyledNavbar from "@/components/navigation/styledNavbar";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { UserProvider } from "@auth0/nextjs-auth0";
import Header from "@/components/shared/header"
import Footer from "@/components/shared/footer";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

// only initialize when in the browser
if (typeof window !== "undefined") {
  LogRocket.init("ogzvmk/erpsors-ho76o");
  // plugins should also only be initialized when in the browser
  setupLogRocketReact(LogRocket);
}

const progress = new ProgressBar({
  size: 3,
  color: theme.palette.primary.main,
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps, err }) {
  return (
    <>
    <Header/>
      <ThemeProvider theme={theme}>
        <StyledSnackbar>
          <UserProvider>
            <StyledNavbar></StyledNavbar>
            <Component {...pageProps} err={err} />
          </UserProvider>
        </StyledSnackbar>
      </ThemeProvider>
      <Footer/>
    </>
  );
}

export default MyApp;
