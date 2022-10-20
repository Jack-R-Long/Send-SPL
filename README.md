# Send SPL Tokens  ⚡

Sending SPL tokens with the Solana Web3.js library is **NOT** as simple as I hoped.  This repo of implements a simple SPL token transfer! 

## Getting Started
```
git clone https://github.com/Jack-R-Long/solana-spl-token-tx-web3.git
yarn
yarn dev
```

- You can use the `sendTransaction` method to send SPL tokens to another wallet address. 

- By default this app will send the SPL tokens to and from the connected wallet.  You can change the `to` address to send SPL tokens to another wallet address.

## Resources

- code was adapted from Rick Lancee's Stack Overflow answer [here](https://stackoverflow.com/questions/70224185/how-to-transfer-custom-spl-token-by-solana-web3-js-and-solana-sol-wallet-ad/).

- [Solana SPL Token Program](https://spl.solana.com/token)