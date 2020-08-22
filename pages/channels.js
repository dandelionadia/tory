import { useEffect } from "react";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function Channels() {
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
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
  }, []);

  return <h1>Channels</h1>;
}
