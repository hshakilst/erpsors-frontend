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
import { LinearProgress, Fade } from "@material-ui/core";
import StyledTopProgressBar from "@/components/ui/styledTopProgressBar";

SentryInitialize();

function MyApp({ Component, pageProps, err }) {
  const [loading, setLoading] = React.useState(null);

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });
  Router.events.on("routeChangeError", () => {
    setLoading(false);
  });

  return (
    <>
      <StyledTopProgressBar isLoading={loading} />
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
