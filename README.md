# Tally Chain

**Both halves match.** A proof-of-work chain where a payment is a receipt. The payer and the payee read the same words, amount and notch from the block.

- Site: https://tallychain.org
- X: https://x.com/tallyonrobin
- Source: https://github.com/Tally-Chain/tallychain
- Whitepaper: [WHITEPAPER.md](WHITEPAPER.md)
- `tTALLY` is the testnet coin and has no market value
- `$TALLY` (Robinhood Chain, ID 4663): [`0x7e270fbd339c5b6cbddb8db6821ec94184f902fb`](https://robinhoodchain.blockscout.com/token/0x7e270fbd339c5b6cbddb8db6821ec94184f902fb) on [Pons](https://ponsfamily.com/launchpad/0x7e270fbd339c5b6cbddb8db6821ec94184f902fb) — funds the path to mainnet

## Mine on the public testnet

Open https://tallychain.org/mine in a browser, or mine from Node.js 20+ directly against the public node:

```bash
npm install
node miner/miner.js YOUR_TALLY1_ADDRESS
```

## Run your own local node

One Node.js process serves the chain, JSON API, wallet and block explorer locally:

```bash
npm install
npm test
npm start          # http://localhost:8344

# Mine against your local node:
node miner/miner.js YOUR_TALLY1_ADDRESS --node http://localhost:8344
```

Environment: `PORT` (8344), `DATA_PATH`, `NODE_PAUSE` (milliseconds between the built-in node miner's hash batches), `MINER_SEED`.

## What a receipt is

A signed `tally.tx.v1` transaction with:

- payer and payee (`tally1…` addresses derived from an ed25519 seed)
- amount, in notches (6 decimal places; `1 tTALLY = 1,000,000 notches`)
- fee, minimum `0.01 tTALLY`, paid to the miner
- words, single line, 1 to 140 UTF-8 bytes
- optional mark, a 64-hex SHA-256 hash of an off-chain file or deliverable

The notch is `SHA-256` of the words. Wallets and the explorer recompute it in the browser and verify the `ed25519` signature against the payer's public key. Change one character and both the notch and the signature fail.

Block reward is `8 tTALLY` plus fees, spendable after 3 further blocks. The faucet drips `25 tTALLY` once an hour per address. Proof of work is `SHA-256`, retargeted every block toward 20 seconds.

## Later

Streams (a wage that notches on a schedule) and Errands (coins locked to a job mark) are specified next. Mainnet follows after those are tested. The receipt rule stays.

## License

BSD 3-Clause. Cryptography uses the audited [noble](https://paulmillr.com/noble/) libraries.
