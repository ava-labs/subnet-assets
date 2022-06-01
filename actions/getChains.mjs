import fs from 'fs';
import path from 'path';
import { ROOT_PATH, CHAIN_INFO_FILE } from './constants.mjs';

export function getChains() {
  return fs
    .readdirSync(ROOT_PATH)

    .map((chainId) => JSON.parse(fs.readFileSync(path.resolve(ROOT_PATH, chainId, CHAIN_INFO_FILE), 'utf8')));
}
