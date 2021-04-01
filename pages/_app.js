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

SentryInitialize();

// Router.events.on("routeChangeStart", () => {
//   NProgress.start();
// });
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, err }) {
  const [progress, setProgress] = React.useState(0);
  const [visibility, setVisibility] = React.useState(null);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  Router.events.on("routeChangeStart", () => {
    setVisibility(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setVisibility(false);
  });
  Router.events.on("routeChangeError", () => {
    setProgress(100);
    setVisibility(false);
  });

  return (
    <>
      <Fade in={visibility}>
        <LinearProgress
          variant="determinate"
          value={progress}
          color="primary"
          style={{ zIndex: 1031 }}
        />
      </Fade>
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
