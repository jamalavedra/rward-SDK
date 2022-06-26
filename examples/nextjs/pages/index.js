import { useEffect, useState } from "react";
import Head from "next/head";
import { Convo } from "@rward.xyz/sdk";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";

export default function Home() {
  let RwardInstance = new Convo("CS2v5qdHaGTmuMZ1Mg9uWHHi6Nz0ZqayGBflnst8");
  let [web3, setWeb3] = useState(undefined);
  let [accounts, setAccounts] = useState(undefined);

  useEffect(() => {
    authWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authWeb3() {
    if (Boolean(window.ethereum) == true) {
      ethereum.autoRefreshOnNetworkChange = false;
      let w3 = new ethers.providers.Web3Provider(window.ethereum);
      setWeb3(w3);
      ethereum.request({ method: "eth_requestAccounts" }).then(setAccounts);
    } else if (window.web3) {
      setWeb3(web3);
      web3.currentProvider.enable().then(setAccounts);
    } else {
      console.log("Get Web3.");
    }
  }

  async function clearAuth() {
    setWeb3(undefined);
    setAccounts(undefined);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rward Example</title>
        <meta name="description" content="Rward Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://rward.xyz" target="_blank" rel="noreferrer">
            Rward
          </a>
        </h1>

        <p className={styles.description}>
          Get started by opening the console{" "}
          <code className={styles.code}>Ctrl/Cmd+Shift+I</code> on this page.
        </p>

        <p className={styles.description}>
          {accounts === undefined ? (
            <button onClick={authWeb3}>Authenticate</button>
          ) : (
            <>
              {accounts[0]}
              &nbsp;<button onClick={clearAuth}>X</button>
            </>
          )}
        </p>

        <div className={styles.grid}>
          <div
            onClick={() => {
              RwardInstance.pingNode().then(console.log);
            }}
            className={styles.card}
          >
            <h2>Ping Server &rarr;</h2>
            <p>Ping server to check the connection.</p>
          </div>
        </div>

        <p className={styles.description}>Authentication</p>

        <div className={styles.grid}>
          <div
            onClick={async () => {
              let timestamp = Date.now();
              let data = RwardInstance.auth.getSignatureData(
                accounts[0],
                timestamp
              );
              let signature = await web3.send("personal_sign", [
                ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)),
                accounts[0].toLowerCase(),
              ]);
              RwardInstance.auth
                .authenticate(accounts[0], signature, timestamp, "ethereum")
                .then(console.log);
            }}
            className={styles.card}
          >
            <h2>Authenticate &rarr;</h2>
            <p>Get an Authentication Token using the SDK.</p>
          </div>

          <div
            onClick={() => {
              RwardInstance.auth.validate(accounts[0], "").then(console.log);
            }}
            className={styles.card}
          >
            <h2>Validate Auth &rarr;</h2>
            <p>Validate an Authentication Token using the SDK.</p>
          </div>

          <div
            onClick={() => {
              let timestamp = Date.now();
              console.log(
                RwardInstance.auth.getSignatureData(accounts[0], timestamp)
              );
            }}
            className={styles.card}
          >
            <h2>Get Signature Data &rarr;</h2>
            <p>Get the Data used for signing and authentication.</p>
          </div>

          <div
            onClick={() => {
              console.log(
                RwardInstance.auth.getSignatureDataV2(
                  "rward.xyz",
                  "https://rward.xyz/",
                  accounts[0],
                  "1"
                )
              );
            }}
            className={styles.card}
          >
            <h2>Signature Data V2 &rarr;</h2>
            <p>Get the Data used for signing and authentication.</p>
          </div>
        </div>

        <p className={styles.description}>Comments</p>

        <div className={styles.grid}>
          <div
            onClick={() => {
              RwardInstance.rewards
                .send({
                  address: "0x64452Dff1180b21dc50033e1680bB64CDd492582",
                  amount: 10,
                })
                .then(console.log);
            }}
            className={styles.card}
          >
            <h2>Send reward</h2>
          </div>

          <div
            onClick={() => {
              RwardInstance.customers
                .create(accounts[0], "jamalavedra@gmail.com")
                .then(console.log);
            }}
            className={styles.card}
          >
            <h2>Create User</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
