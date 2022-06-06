import fs from 'fs';
import path from 'path';
import {
  ROOT_PATH,
  CHAIN_INFO_FILE,
  CHAIN_LOGO_FILE,
  NATIVE_TOKEN_LOGO_FILE,
  ADDRESS_LIST_FILE,
} from './constants.mjs';

const chains = fs.readdirSync(ROOT_PATH).reduce((acc, chainId) => {
  const chainTokenIds = path.resolve(ROOT_PATH, chainId);
  const tokens = fs
    .readdirSync(chainTokenIds)
    .filter((pathValue) => ![CHAIN_INFO_FILE, CHAIN_LOGO_FILE, NATIVE_TOKEN_LOGO_FILE].includes(pathValue));
  return { ...acc, [chainId]: [...tokens] };
}, {});

fs.writeFileSync(ADDRESS_LIST_FILE, JSON.stringify(chains, null, 2));
