import { SendSplToken } from "./spl";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function App() {
  const { publicKey } = useWallet();
  const splTokenMint = new PublicKey(
    "popwcrLzjetHAFCH91LBTK78zapZ54Rftpc7PGoHpuh"
  );

  return (
    <div className="App">
      <nav className="navbar">
        <a href="https://reactjs.org" target="_blank">
          <img src="/solana.svg" className="logo react" alt="React logo" />
        </a>
        <WalletMultiButton />
      </nav>
      <main className="main">
        <h1>Send Spl Tokens</h1>
        <div className="card">
          {publicKey && (
            <SendSplToken
              mintSplToken={splTokenMint}
              toPublicKey={publicKey}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
