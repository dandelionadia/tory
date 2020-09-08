import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/login")}
      >
        Hello Button
      </Button>
    </div>
  );
}
