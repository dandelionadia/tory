import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { List, Avatar, Link, Stack, Heading } from "@chakra-ui/core";

import { AuthContext } from "../context/AuthContext";

export default function Channels() {
  const { accessToken } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState();

  const router = useRouter();

  useEffect(
    () => {
      // if you wasn't on the page for a week than you need to log in again.
      if (!accessToken) {
        router.push("/login");
        return;
      }

      fetch(
        `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
        {
          headers: {
            // google know it is use by accessToken
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setSubscriptions(data);
        });
    },
    // refresh useEffect hook when accessToken changes.
    [accessToken]
  );

  if (!accessToken) {
    return null;
  }

  if (!subscriptions) {
    return <p>looading</p>;
  }

  if (subscriptions.error) {
    return <p>error</p>;
  }

  return (
    <>
      <Heading mb={6} mt={6}>
        Channels
      </Heading>
      <List styleType="disc">
        <Stack spacing={4}>
          (accessToken ?
          {subscriptions.items.map((channel) => {
            return (
              <Stack
                isInline
                spacing={4}
                shadow="md"
                borderWidth="1px"
                p={3}
                align="center"
                width="500px"
                maxWidth="100%"
                key={channel.snippet.resourceId.channelId}
              >
                <Link
                  href={`https://www.youtube.com/channel/${channel.snippet.resourceId.channelId}`}
                  target="_blank"
                >
                  <Avatar
                    name={channel.snippet.title}
                    src={channel.snippet.thumbnails.default.url}
                  />
                </Link>
                <Link
                  href={`https://www.youtube.com/channel/${channel.snippet.resourceId.channelId}`}
                  target="_blank"
                  fontSize="md"
                >
                  {channel.snippet.title}
                </Link>
              </Stack>
            );
          })}
          : null)
        </Stack>
      </List>
    </>
  );
}
