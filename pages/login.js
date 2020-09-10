import { useContext, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Box, Heading, Text } from "@chakra-ui/core";

import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleAuthSuccess = (response) => {
    setAccessToken(response.accessToken);
    Cookies.set("accessToken", response.accessToken);
    router.push("/channels");
  };

  const handleAuthFailure = (error) => {
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
      <Box
        d="flex"
        flexDirection="column"
        p={4}
        alignItems="center"
        shadow="md"
        borderWidth="1px"
        width="500px"
        maxWidth="100%"
        margin="auto"
        mt={6}
      >
        <Heading as="h2" size="xl">
          Login
        </Heading>
        <Text fontSize="lg" p={4}>
          Use your Google account to log in.
        </Text>
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          scope="profile email https://www.googleapis.com/auth/youtube.readonly"
          buttonText="Login"
          onSuccess={handleAuthSuccess}
          onFailure={handleAuthFailure}
        />
        {errorMessage && <p>{errorMessage}</p>}
      </Box>
    </div>
  );
}
