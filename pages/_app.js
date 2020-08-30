import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/globals.css";
import Cookies from "js-cookie";

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
