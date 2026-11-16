# Tally Chain

Both halves match. Whitepaper, version 0.1 (testnet), November 2026.

Tally is a proof-of-work chain where a payment is a receipt. The payer, the payee, the amount, the words and an optional mark are signed and cut into a block. Both sides read that same receipt back. Neither side can change it after the block.

## The problem

A transfer says that value moved. It does not say what the value was for. That sentence lives in a chat or a screenshot, and either can be cropped.

## Design

The receipt is the transaction. The words are one line, up to 140 bytes. The notch is SHA-256 of those words, recomputed by whoever looks. An optional 32-byte mark commits to a file or a post that stays off the chain. Amounts stay public, because a receipt you cannot show is not a receipt.

## Keys and consensus

One 32-byte seed, ed25519, address prefix `tally1`. SHA-256 proof of work, retargeted every block toward 20 seconds. Reward 8 tTALLY plus fees, spendable after 3 further blocks. Faucet 25 tTALLY once an hour per address. No premine and no treasury key.

tTALLY has no market value. $TALLY on Robinhood Chain (`0x7e270fbd339c5b6cbddb8db6821ec94184f902fb`) is a separate token that carries development to mainnet.

The testnet hash is SHA-256 so a browser and the node run the same function. The receipt rules do not depend on the hash.

## Next

- Streams: a wage that notches on a schedule. Coins already earned stay with the payee.
- Errands: coins locked to a job until the worker’s mark is released, or a deadline returns them.
- Mainnet after those are specified and tested.

## What this paper does not claim

Tally does not hide amounts or parties. A signature proves the payer agreed to the bytes in the block. It does not, by itself, prove the off-chain work was done. Errands are the phase that binds the coins to that question.
