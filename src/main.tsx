// import { EthereumClient } from "@web3modal/ethereum";
// import { Web3Modal } from "@web3modal/react";
// wallet connect 1.0 removed due to expiry
// replace with rainbowkit to connect and still use wagmi
import * as React from "react";
import * as ReactDOM from "react-dom/client";
// import { WagmiConfig } from "wagmi";

import { App } from "./App";

// import { chains, client, walletConnectProjectId } from "./wagmi";
// const ethereumClient = new EthereumClient(client, chains);

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { mainnet, optimism, polygon } from "wagmi/chains";
 
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, optimism, polygon],
  [publicProvider()],
)
 
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
      {/* <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
      /> */}
    </WagmiConfig>
  </React.StrictMode>
);
