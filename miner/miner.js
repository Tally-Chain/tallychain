import { belowTarget, powHash } from '../client/protocol.js';

const address = process.argv[2];
if (!address || address.startsWith('--')) {
  console.log('usage: node miner/miner.js tally1... [--node https://tallychain.org]');
  process.exit(1);
}
const nodeFlag = process.argv.indexOf('--node');
const node = (nodeFlag === -1 ? 'https://tallychain.org' : process.argv[nodeFlag + 1]).replace(/\/$/, '');

let found = 0;
console.log(`mining for ${address}\nnode ${node}`);

while (true) {
  const res = await fetch(`${node}/api/work?address=${encodeURIComponent(address)}`);
  const work = await res.json();
  if (!res.ok) {
    console.log(work.error || 'no work');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    continue;
  }
  const diff = BigInt(work.header.diff);
  let nonce = Math.floor(Math.random() * 0x100000000);
  let hashes = 0;
  const started = Date.now();
  let solved = false;
  while (Date.now() - started < 8000) {
    const digest = powHash(work.header, nonce);
    hashes += 1;
    if (belowTarget(digest, diff)) {
      const sent = await fetch(`${node}/api/work`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: work.id, nonce }),
      });
      const body = await sent.json();
      if (sent.ok) {
        found += 1;
        console.log(`block ${body.height}  ${body.hash.slice(0, 12)}…  (${found} found)`);
      } else {
        console.log(body.error || 'rejected');
      }
      solved = true;
      break;
    }
    nonce = (nonce + 1) >>> 0;
    if (hashes % 20000 === 0) {
      const rate = Math.round(hashes / ((Date.now() - started) / 1000));
      console.log(`${rate} H/s`);
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
  if (!solved) {
    const rate = Math.round(hashes / Math.max(0.001, (Date.now() - started) / 1000));
    console.log(`${rate} H/s  still looking`);
  }
}
