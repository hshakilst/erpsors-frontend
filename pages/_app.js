import "@/styles/_app.css";
import StyledSnackbar from "@/components/ui/styledSnackbar";
import { ThemeProvider } from "@material-ui/styles";
import theme from "@/components/ui/theme";
import { SWRConfig } from "swr";
import fetcher from "@/libs/fetcher";
import { AuthProvider } from "@/libs/auth";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledSnackbar>
        <AuthProvider>
          {/* <SWRConfig
          value={{
            fetcher: fetcher,
            onError: (err) => {
              console.error(err);
            },
          }}
        > */}
          <Component {...pageProps} />
        </AuthProvider>
        {/* </SWRConfig> */}
      </StyledSnackbar>
    </ThemeProvider>
  );
}

export default MyApp;
