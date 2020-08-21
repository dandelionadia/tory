import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    margin: "2rem auto",
  },
});

export default function Login() {
  const [accessToken, setAccessToken] = useState();

  const classes = useStyles();

  const responseGoogle = (response) => {
    setAccessToken(response.accessToken);
  };

  const hanleFetch = () => {
    fetch(
      `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

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
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
          <Button onClick={hanleFetch}>test button</Button>
        </CardContent>
      </Card>
    </div>
  );
}
