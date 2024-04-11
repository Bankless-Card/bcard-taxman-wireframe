import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <WagmiConfig config={config}> */}
      <App />
      {/* <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
      /> */}
    {/* </WagmiConfig> */}
  </React.StrictMode>
);
