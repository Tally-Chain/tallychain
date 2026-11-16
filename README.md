# Tally Chain

**Both halves match.** A proof-of-work chain where a payment is a receipt. The payer and the payee read the same words, amount and notch from the block.

- Site: https://tallychain.org
- Source: https://github.com/Tally-Chain/tallychain
- Testnet, explorer and wallet: run `npm start` and open http://localhost:8344
- Whitepaper: [WHITEPAPER.md](WHITEPAPER.md)
- tTALLY is the testnet coin and has no market value
- $TALLY on Robinhood Chain carries the project to mainnet. The contract is published at token launch

## Run

Node.js 20 or newer.

```bash
npm install
npm test
npm start
```

Environment: `PORT` (8344), `DATA_PATH`, `NODE_PAUSE` (milliseconds between the public node's hash batches), `MINER_SEED`.

## Mine

Open http://localhost:8344/mine or:

```bash
node miner/miner.js YOUR_TALLY1_ADDRESS --node http://localhost:8344
```

## What a receipt is

A signed transaction with:

- payer and payee (`tally1…` addresses from an ed25519 seed)
- amount, in notches (6 decimal places)
- fee, minimum 0.01 tTALLY, paid to the miner
- words, one line, up to 140 bytes
- optional mark, a 64-hex hash of an off-chain file or post

The notch is SHA-256 of the words. Wallets and the explorer recompute it. The signature covers the canonical bytes, so a changed word does not verify.

Block reward is 8 tTALLY plus fees, spendable after 3 further blocks. Faucet drips 25 tTALLY once an hour. Proof of work is SHA-256, retargeted every block toward 20 seconds.

## Later

Streams (a wage that notches on a schedule) and errands (coins locked to a job) are specified next. Mainnet follows after those are tested. The receipt rule stays.

## License

BSD 3-Clause. Cryptography is the audited [noble](https://paulmillr.com/noble/) libraries.
