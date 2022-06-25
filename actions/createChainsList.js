import fs from 'fs';
import path from 'path';
import {
  ROOT_PATH,
  SUBNET_EXPLORER_MAINNET_CHAIN_LIST_FILE,
  SUBNET_EXPLORER_TESTNET_CHAIN_LIST_FILE,
} from './constants.mjs';
import { createChain } from './createChain.mjs';
import { createSubnet } from './createSubnet.mjs';

fs.readdir(ROOT_PATH, async (err, files) => {
  if (!err && files) {
    let mainnetChains = {};
    let testnetChains = {};

    await Promise.all(
      files.map(async (chainId) => {
        const chain = createChain(chainId);

        // If no subnetUriId, it isn't supported in the subnet explorer.
        if (!chain.subnetExplorerUriId) return;

        let subnet = {};
        try {
          subnet = createSubnet(chain.subnetId);
        } catch {
          // subnet config doesn't exist - do nothing.
        }

        console.log('subnet', subnet);
        if (chain.isTestnet) {
          testnetChains = {
            ...testnetChains,
            [chain.chainId]: {
              ...chain,
              subnet,
            },
          };
        } else {
          mainnetChains = {
            ...mainnetChains,
            [chain.chainId]: {
              ...chain,
              subnet,
            },
          };
        }
      })
    );

    // Writing the mainnetChainsList.json file
    fs.writeFileSync(SUBNET_EXPLORER_MAINNET_CHAIN_LIST_FILE, JSON.stringify(mainnetChains, null, 2));
    // Writing the testnetChainsList.json file
    fs.writeFileSync(SUBNET_EXPLORER_TESTNET_CHAIN_LIST_FILE, JSON.stringify(testnetChains, null, 2));
  }
});
