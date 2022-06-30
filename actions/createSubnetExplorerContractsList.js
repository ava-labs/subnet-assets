import fs from 'fs';
import path from 'path';
import { ROOT_PATH, SUBNET_EXPLORER_CONTRACT_LIST_FILE } from './constants.mjs';
import { getTokens } from './getTokens.mjs';

fs.readdir(ROOT_PATH, async (err, files) => {
  if (!err && files) {
    let chainTokenDictionaries = {};

    await Promise.all(
      files.map(async (chainId) => {
        // this is all chain paths. ie.../subnet-assets/chains/11111
        const chainDirectory = path.resolve(ROOT_PATH, chainId);
        const tokens = getTokens(chainId, chainDirectory);

        const tokenDictionary = {};
        tokens.forEach((token) => {
          tokenDictionary[token.address] = token;
        });
        chainTokenDictionaries[chainId] = tokenDictionary;
      })
    );

    // Writting the subnet explorer contract list file
    fs.writeFileSync(SUBNET_EXPLORER_CONTRACT_LIST_FILE, JSON.stringify(chainTokenDictionaries, null, 2));
  }
});
