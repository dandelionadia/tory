import { useContext, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleLogin } from "react-google-login";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    margin: "2rem auto",
  },
});

export default function Login() {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const classes = useStyles();

  const handleAuthSuccess = (response) => {
    setAccessToken(response.accessToken);
    Cookies.set("accessToken", response.accessToken);
    router.push("/channels");
  };

  const failureMessage = (error) => {
    return setErrorMessage(error);
  };

  useEffect(() => {
    if (accessToken) {
      router.push("/channels");
    }
  }, [accessToken]);

  if (accessToken) {
    return null;
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          title="Login"
          subheader="Use your Google account to log in."
        />
        <CardContent>
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            scope="profile email https://www.googleapis.com/auth/youtube.readonly"
            buttonText="Login"
            onSuccess={handleAuthSuccess}
            onFailure={failureMessage}
          />
          {errorMessage && <p>{errorMessage}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
