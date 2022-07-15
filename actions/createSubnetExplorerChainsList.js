import fs from 'fs';
import path from 'path';
import {
  ROOT_PATH,
  SUBNET_EXPLORER_MAINNET_CHAIN_LIST_FILE,
  SUBNET_EXPLORER_TESTNET_CHAIN_LIST_FILE,
} from './constants.mjs';
import { createChain } from './createChain.mjs';

const gitRef = process.argv?.[2];
if (!gitRef) throw new Error('Missing $GITHUB_SHA or other git ref argument');

fs.readdir(ROOT_PATH, async (err, files) => {
  if (!err && files) {
    let mainnetChains = {};
    let testnetChains = {};

    await Promise.all(
      files.map(async (chainId) => {
        const chain = createChain(chainId, gitRef);
        // If no subnetUriId, it isn't supported in the subnet explorer.
        if (!chain.subnetExplorerUriId) return;

        if (chain.isTestnet) {
          testnetChains[chain.chainId] = chain;
          return;
        }
        mainnetChains[chain.chainId] = chain;
      })
    );

    // Writing the mainnetChainsList.json file
    fs.writeFileSync(SUBNET_EXPLORER_MAINNET_CHAIN_LIST_FILE, JSON.stringify(mainnetChains, null, 2));
    // Writing the testnetChainsList.json file
    fs.writeFileSync(SUBNET_EXPLORER_TESTNET_CHAIN_LIST_FILE, JSON.stringify(testnetChains, null, 2));
  }
});
