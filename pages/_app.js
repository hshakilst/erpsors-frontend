import "@/styles/_fonts.css";
import "@/styles/_app.css";
import React from "react";
import StyledSnackbar from "@/components/ui/styledSnackbar";
import { ThemeProvider } from "@material-ui/styles";
import theme from "@/components/ui/theme";
import { SentryInitialize } from "@/libs/sentry";
import { AuthProvider } from "@/libs/auth";
import StyledNavbar from "@/components/ui/styledNavbar";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

LogRocket.init("ogzvmk/demo");
setupLogRocketReact(LogRocket);

SentryInitialize();

const progress = new ProgressBar({
  size: 3,
  color: "#5F2EEA",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps, err }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledSnackbar>
          <AuthProvider>
            <StyledNavbar></StyledNavbar>
            <Component {...pageProps} err={err} />
          </AuthProvider>
        </StyledSnackbar>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
