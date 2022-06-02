import { getChains } from './getChains.mjs';
import { createChain } from './createChain.mjs';
import fs from 'fs';
import { CHAIN_LIST_FILE } from './constants.mjs';

const chains = getChains();

fs.writeFileSync(
  CHAIN_LIST_FILE,
  JSON.stringify(
    chains.map((chainInfo) => createChain(chainInfo.chainId)),
    null,
    2
  )
);
