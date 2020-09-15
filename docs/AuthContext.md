# AuthContext

## Why?

- To lift the state up and use it in the login and channels pages.

- When user logins in the google we took this information to the youtube and shows the data what we need.

## Implamantation

Creates context in the new file.

```js
import { createContext } from "react";

export const AuthContext = createContext();
```

### \_app.js

- uses context from `AuthContext`
- creates `useState`
- creates `Provider` with value=`state`

```js
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
```

### login.js

- use context and changes state when user login

```js
import { GoogleLogin } from "react-google-login";
import Cookies from "js-cookie";

function Login() {
  const { setAccessToken } = useContext(AuthContext);

  const handleAuthSuccess = (response) => {
    // response is info from google and it has property 'accessToken'
    setAccessToken(response.accessToken);
    Cookies.set("accessToken", response.accessToken);
  };

  return (
    <GoogleLogin onSuccess={handleAuthSuccess} />;
  )
}
```

### channels.js

- use context and state

```js
function Channels() {
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    fetch(`/api`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }, []);
}
```
