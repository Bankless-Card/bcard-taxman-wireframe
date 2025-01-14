// import { Web3Button } from "@web3modal/react";
// import { useAccount } from "wagmi";
import { createElement, useState } from "react";

// TESTING NEW PUSH - TOM
// THIS IS JUST A TEST - TOM

import {
  AppContainer,
  Footer,
  Navbar,
  CallToAction,
} from "./components/HomePage";
// import AccountForm from "./components/AccountForm";
import MainContent from "./components/MainContent";
import { UIProvider } from "./context/UIContext";

// require('dotenv').config()
// console.log(process.env);
// import { REACT_APP_ALCHEMY_API_KEY, ELASTICMAIL_SECURETOKEN } from "./data";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
// const settings = {
//   apiKey: REACT_APP_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
//   network: Network.ETH_MAINNET, // Replace with your network.
// };

// const alchemy = new Alchemy(settings);

// import './style.module.css'
// Sample of dynamically applied CSS
import cs from "./style.module.css";

// let daoSel = {
//   WETH: true,
//   BANK: true,
//   DAI: true,
// };

export function App() {
  // this to get connected accouunt info from WalletConnect
  // const { address, isConnected } = useAccount();
  // example with BANK token
  const [BANK, setBANK] = useState(true);
  const [POOL, setPOOL] = useState(true);
  // const WETH = false;
  // daoSel.WETH = true;
  const [FIAT, setFIAT] = useState("CAD"); // default cad, later probably usd
  // console.log(FIAT);

  return (
    <UIProvider>
      <AppContainer>
        <Navbar />
        <MainContent />
        <Footer />
        <CallToAction />
      </AppContainer>
    </UIProvider>
  );
}
