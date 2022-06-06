import fs from 'fs';
import path from 'path';
import { ROOT_PATH, ERC20_TOKEN_LIST_FILE } from './constants.mjs';
import { getTokens } from './getTokens.mjs';
import { createChain } from './createChain.mjs';
import { getAverageColor } from 'fast-average-color-node';
import async from 'async';

fs.readdir(ROOT_PATH, async (err, files) => {
  if(!err && files) {
    let chains = {};

    await async.forEachOf(files, async (chainId) => {
      // this is all chain paths. ie.../subnet-assets/chains/11111
      const chainTokenIds = path.resolve(ROOT_PATH, chainId);
      const tokens = getTokens(chainId, chainTokenIds);
      const tokensWithAverageColor = await async.map(tokens, async (token) => {
        if (token.logoUri) {
          try {
            const color = await getAverageColor(token.logoUri);
            
            return {
              ...token,
              tokenColor: color.hex,
            };
          } catch (err) {
            console.log(err);
          }
        }
        return token;
      });

      const chain = {
        ...createChain(chainId, chainTokenIds),
        tokens: tokensWithAverageColor.filter((token) => token.contractType === 'ERC-20'),
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
