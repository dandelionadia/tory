import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "@chakra-ui/core";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button variantColor="green" onClick={() => router.push("/login")}>
        Hello Button
      </Button>
    </div>
  );
}
