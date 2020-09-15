import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/globals.css";
import Cookies from "js-cookie";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import customTheme from "../theme";

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <AuthContext.Provider value={{ accessToken, setAccessToken }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
