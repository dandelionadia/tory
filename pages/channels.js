import { useEffect, useState, useContext } from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Link from "@material-ui/core/Link";
import { useRouter } from "next/router";

import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    marginBottom: "10px",
  },
}));

export default function Channels() {
  const { accessToken } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState();

  const router = useRouter();
  const classes = useStyles();

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

  return (
    <>
      <h1>Channels</h1>
      <List className={classes.root}>
        {subscriptions.items.map((channel) => {
          return (
            <>
              <Card className={classes.item}>
                <CardHeader
                  avatar={
                    <Link
                      href={`https://www.youtube.com/channel/${channel.snippet.resourceId.channelId}`}
                      target="_blank"
                    >
                      <Avatar
                        alt={channel.snippet.title}
                        src={channel.snippet.thumbnails.default.url}
                      />
                    </Link>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={
                    <Link
                      href={`https://www.youtube.com/channel/${channel.snippet.resourceId.channelId}`}
                      target="_blank"
                    >
                      {channel.snippet.title}
                    </Link>
                  }
                />
              </Card>
            </>
          );
        })}
      </List>
    </>
  );
}
