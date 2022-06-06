import fs from 'fs';
import path from 'path';
import { ROOT_PATH, ERC20_TOKEN_LIST_FILE } from './constants.mjs';
import { getTokens } from './getTokens.mjs';
import { createChain } from './createChain.mjs';
import async from 'async';
import { createTokens } from './createTokens.js';

fs.readdir(ROOT_PATH, async (err, files) => {
  if (!err && files) {
    let chains = {};

    await async.forEachOf(files, async (chainId) => {
      // this is all chain paths. ie.../subnet-assets/chains/11111
      const chainTokenIds = path.resolve(ROOT_PATH, chainId);
      const tokens = getTokens(chainId, chainTokenIds);

      const chain = {
        ...createChain(chainId, chainTokenIds),
        ...createTokens(tokens),
      };

      chains = {
        ...chains,
        [chain.chainId]: chain,
      };
    });

    // Writting the tokenList.erc20.json file
    fs.writeFileSync(ERC20_TOKEN_LIST_FILE, JSON.stringify(chains, null, 2));
  }
});
