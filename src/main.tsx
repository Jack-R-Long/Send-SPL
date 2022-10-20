import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WalletContext } from "./wallet/wallet_context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WalletContext>
      <App />
    </WalletContext>
  </React.StrictMode>
);
