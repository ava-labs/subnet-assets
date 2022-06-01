import fs from 'fs';
import path from 'path';
import { CHAIN_INFO_FILE, SUBNETS_ROOT_PATH, SUBNET_INFO_FILE } from './constants.mjs';

export function getSubnets() {
  return fs
    .readdirSync(SUBNETS_ROOT_PATH)

    .map((chainId) => JSON.parse(fs.readFileSync(path.resolve(ROOT_PATH, chainId, SUBNET_INFO_FILE), 'utf8')));
}
