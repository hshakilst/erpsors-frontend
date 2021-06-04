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
          <UserProvider>
            <StyledNavbar></StyledNavbar>
            <Component {...pageProps} err={err} />
          </UserProvider>
        </StyledSnackbar>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
