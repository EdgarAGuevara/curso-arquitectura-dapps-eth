import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function MyApp({ Component, pageProps }) {

  const [walletAccount, setWalletAccount] = useState("");
  const [isConnectedToGoerli, setIsConnectedToGoerli] = useState(true);

  const checkIfMetaMaskIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Check if Metamask is NOT installed.");
    } else {
      console.log("Check if Metamask is installed.");

      ethereum.on("chainChanged", (networkId) => {
        if (parseInt(networkId) !== 5) {
          setIsConnectedToGoerli(false);
        } else {
          setIsConnectedToGoerli(true);
        }
      });
    }

    const accounts = await ethereum.request({
      method: "eth_accounts"
    })

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    if (accounts.legnth != 0) {
      setWalletAccount(accounts[0]);
    } else {
      console.log("There's not  authorized account");
    }
  };

  const connctMetaMask = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("You need metmask");
        return
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });

      console.log(accounts[0]);
      setWalletAccount(accounts[0]);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfMetaMaskIsConnected();
  }, []);

  return (
    <>

      {!isConnectedToGoerli && (
        <div className={styles.container}>
          <div className={styles.wrongNetwork}>
            <h1>Red Equivocada</h1>
            <p>
              {" "}
              Por favor conextarse a la red Goerli en su MetaMask. Gracias.
            </p>
          </div>
        </div>
      )}

      {
        (!walletAccount && isConnectedToGoerli) && (
          <div className={styles.container}>
            <button
              className={styles.walletButton}
              onClick={connctMetaMask}
            >
              Log in
            </button>
          </div>
        )
      }

      {
        (walletAccount && isConnectedToGoerli) && (
          <div>
            <main>
              <nav className="border-b p-6">
                <p className="text-4xl font-bold">Platzi Eaters</p>
                <div className="flex mt-4">
                  <Link href="/">
                    <a className="mr-4 text-pink-500">Inicio</a>
                  </Link>
                  <Link href="/add-dish">
                    <a className="mr-6 text-pink-500">Agregar platillos</a>
                  </Link>
                  <Link href="/my-dishes">
                    <a className="mr-6 text-pink-500">Mis platillos</a>
                  </Link>
                </div>
              </nav>
            </main>
            <Component {...pageProps} />
          </div>
        )
      }
    </>
  );
}

export default MyApp;
