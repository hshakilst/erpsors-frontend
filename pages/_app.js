import "@/styles/_fonts.css";
import "@/styles/_app.css";
import StyledSnackbar from "@/components/ui/styledSnackbar";
import { ThemeProvider } from "@material-ui/styles";
import theme from "@/components/ui/theme";
import { SentryInitialize } from "@/libs/sentry";
import { AuthProvider } from "@/libs/auth";
SentryInitialize();

function MyApp({ Component, pageProps, err }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledSnackbar>
        <AuthProvider>
          <Component {...pageProps} err={err} />
        </AuthProvider>
      </StyledSnackbar>
    </ThemeProvider>
  );
}

export default MyApp;
