import Button from "@material-ui/core/Button";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button variant="contained" color="primary">
        Hello Button
      </Button>
    </div>
  );
}
