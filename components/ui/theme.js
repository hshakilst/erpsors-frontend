import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#BCA4FF",
      main: "#5F2EEA",
      dark: "#2A00A2",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#82E9FF",
      main: "#1CC8EE",
      dark: "#0096B7",
      contrastText: "#000",
    },
    gradient: {
      primary: "linear-gradient(-45deg, #FFA3FD, #7433FF)",
      secondary: "linear-gradient(-45deg, #50DDC3, #624AF2)",
      accent: "linear-gradient(-45deg, #FFFA80, #EB0055)",
    },
    error: {
      light: "#ff6aad",
      main: "#ed2e7e",
      dark: "#b50052",
    },
    success: {
      light: "#34EAB9",
      main: "#00BA88",
      dark: "#00966D",
    },
    warning: {
      light: "#FFD789",
      main: "#F4B740",
      dark: "#946200",
    },
    grey: {
      background: "#FFFFFF",
      inputBackground: "#EFF0F6",
      offWhite: "#FCFCFC",
      line: "#D9DBE9",
      placeholder: "#A0A3BD",
      label: "#6E7191",
      body: "#4E4B66",
      title: "#14142B",
    },
  },
  typography: {
    fontFamily: `Poppins, sans-serif`,
  },
});

export default theme;
