import fs from 'fs';
import path from 'path';
import { ROOT_PATH, ERC20_TOKEN_LIST_FILE } from './constants.mjs';
import { getTokens } from './getTokens.mjs';
import { createChain } from './createChain.mjs';
import { createTokens } from './createTokens.mjs';

process.argv.forEach(function (val, index, array) {
  console.log('commit sha:', index + ': ' + val);
});

fs.readdir(ROOT_PATH, async (err, files) => {
  if (!err && files) {
    let chains = {};

    await Promise.all(
      files.map(async (chainId) => {
        // this is all chain paths. ie.../subnet-assets/chains/11111
        const chainTokenIds = path.resolve(ROOT_PATH, chainId);
        const tokens = getTokens(chainId, chainTokenIds);

        const chain = {
          ...createChain(chainId),
          tokens: [...(await createTokens(tokens, 'ERC-20'))],
        };

        chains = {
          ...chains,
          [chain.chainId]: chain,
        };
      })
    );

    // Writting the tokenList.erc20.json file
    fs.writeFileSync(ERC20_TOKEN_LIST_FILE, JSON.stringify(chains, null, 2));
  }
});
