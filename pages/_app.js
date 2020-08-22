import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState();

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
