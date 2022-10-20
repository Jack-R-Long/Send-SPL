import { TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { getOrCreateAssociatedTokenAccountCustom } from "./getOrCreateAssociatedTokenAccount";

interface IProps {
  mintSplToken: PublicKey;
  toPublicKey: PublicKey;
}

export const SendSplToken = ({ mintSplToken, toPublicKey }: IProps) => {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [loading, setLoading] = useState("NOT_LOADING");
  const [txHash, setTxHash] = useState("");

  if (!publicKey || !signTransaction) {
    console.error("Wallet not connected");
    return <></>;
  }

  const sendPop = async () => {
    setLoading("CREATING");

    try {
      const fromTokenAccount = await getOrCreateAssociatedTokenAccountCustom(
        connection,
        publicKey,
        mintSplToken,
        publicKey,
        signTransaction
      );

      const toTokenAccount = await getOrCreateAssociatedTokenAccountCustom(
        connection,
        publicKey,
        mintSplToken,
        toPublicKey,
        signTransaction
      );

      const amount = 100 * Math.pow(10, 9);

      const transaction = new Transaction().add(
        createTransferInstruction(
          fromTokenAccount.address,
          toTokenAccount.address,
          publicKey,
          amount,
          [],
          TOKEN_PROGRAM_ID
        )
      );
      // set a recent block hash so the tx passes smoothly
      const latestBlockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = latestBlockhash.blockhash;

      // set the fee payer
      transaction.feePayer = publicKey;

      // sign the transaction
      const signedTransaction = await signTransaction(transaction);

      // send the signal transaction
      const txHash = await connection.sendRawTransaction(
        signedTransaction.serialize(),
        {
          maxRetries: 3,
          skipPreflight: true,
        }
      );
      // setPopTxAddress(txHash);

      setLoading("CONFIRMING");

      await connection.confirmTransaction({
        signature: txHash,
        blockhash: latestBlockhash.blockhash, // The latest blockhash that you used to submit it.
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight, // The block height after which that hash is no longer valid
      });

      setLoading("SUCCESS");
      setTxHash(txHash);
      console.log("response", txHash);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={() => sendPop()}>Send Token</button>
      <p>Status: {loading}</p>
      {txHash && (
        <div>
          <p>Transaction: {txHash ? txHash : "N/A"}</p>
          <a
            href={`https://solscan.io/tx/${txHash}`}
          >
            Solscan
          </a>
        </div>
      )}
    </div>
  );
};
