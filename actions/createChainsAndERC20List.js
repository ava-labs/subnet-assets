import fs from 'fs';
import path from 'path';
import { ROOT_PATH, ERC20_TOKEN_LIST_FILE } from './constants.mjs';
import { getTokens } from './getTokens.mjs';
import { createChain } from './createChain.mjs';

const chains = fs.readdirSync(ROOT_PATH).reduce((acc, chainId) => {
  // this is all chain paths. ie.../subnet-assets/chains/11111
  const chainTokenIds = path.resolve(ROOT_PATH, chainId);

  const chain = {
    ...createChain(chainId, chainTokenIds),
    tokens: getTokens(chainId, chainTokenIds).filter((token) => token.contractType === 'ERC-20'),
  };

  return { ...acc, [chain.chainId]: chain };
}, {});

fs.writeFileSync(ERC20_TOKEN_LIST_FILE, JSON.stringify(chains, null, 2));
