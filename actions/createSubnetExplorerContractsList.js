import fs from 'fs';
import path from 'path';
import {
  ROOT_PATH,
  SUBNET_EXPLORER_MAINNET_CONTRACT_LIST_FILE,
  SUBNET_EXPLORER_TESTNET_CONTRACT_LIST_FILE,
} from './constants.mjs';
import { createChain } from './createChain.mjs';
import { getTokens } from './getTokens.mjs';

fs.readdir(ROOT_PATH, async (err, files) => {
  if (!err && files) {
    let mainnetChainTokenDictionaries = {};
    let testnetChainTokenDictionaries = {};

    await Promise.all(
      files.map(async (chainId) => {
        // this is all chain paths. ie.../subnet-assets/chains/11111
        const chainInformation = createChain(chainId);

        const chainDirectory = path.resolve(ROOT_PATH, chainId);
        const tokens = getTokens(chainId, chainDirectory);

        const tokenDictionary = {};
        tokens.forEach((token) => {
          tokenDictionary[token.address] = token;
        });
        if (chainInformation.isTestnet) {
          testnetChainTokenDictionaries[chainId] = tokenDictionary;
        } else {
          mainnetChainTokenDictionaries[chainId] = tokenDictionary;
        }
      })
    );

    // Writting the subnet explorer contract list files
    fs.writeFileSync(
      SUBNET_EXPLORER_MAINNET_CONTRACT_LIST_FILE,
      JSON.stringify(mainnetChainTokenDictionaries, null, 2)
    );
    fs.writeFileSync(
      SUBNET_EXPLORER_TESTNET_CONTRACT_LIST_FILE,
      JSON.stringify(testnetChainTokenDictionaries, null, 2)
    );
  }
});
