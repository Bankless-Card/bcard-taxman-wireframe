import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import { createElement, useState } from "react";
import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";
// @ts-ignore Import module
import { Email } from "./functions/smtpjsv3";
// @ts-ignore Import module
import { searchTree } from "./functions/searchTree";
// components from library
import { Account } from "./components";
import { Card } from "./components";
import { Clock } from "./components";
import { Btn } from "./components";
import {
  AppContainer,
  Footer,
  Navbar,
  TitleContent,
  CallToAction,
} from "./components/HomePage";

import { DaoSelectors } from "./components";

// data from library
import { bankFeed } from "./data"; // import pricefeed Data

// functions from library
import { toggleAlts } from "./functions";
import { toggleDetail } from "./functions";
import { finishButton } from "./functions"; // action of finish button not component
import { toggleSwitch } from "./functions"; // action of switch not component
// import { handleOpen } from './functions'
import { getTokenLogo } from "./functions";
import { getTokenLabel } from "./functions";
import { displayTokenAmount } from "./functions";
import { displayConvertAmount } from "./functions";
import {
  handleOpen,
  handleSave,
  handleIncomeToggle,
  alchemyGo,
  triggerTx,
  callSetFiat,
  getProvinceSelect,
  exportData,
} from "./utils";
// require('dotenv').config()
// console.log(process.env);
import { REACT_APP_ALCHEMY_API_KEY, ELASTICMAIL_SECURETOKEN } from "./data";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: REACT_APP_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

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
  const { address, isConnected } = useAccount();
  // example with BANK token
  const [BANK, setBANK] = useState(true);
  const [POOL, setPOOL] = useState(true);
  // const WETH = false;
  // daoSel.WETH = true;
  const [FIAT, setFIAT] = useState("CAD"); // default cad, later probably usd
  // console.log(FIAT);

  return (
    <>
      <AppContainer>
        <Navbar />
        <TitleContent />
        <Footer />
        <CallToAction />
      </AppContainer>
    </>
  );
}
