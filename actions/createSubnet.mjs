import fs from 'fs';
import path from 'path';
import { createChain } from './createChain.mjs';
import { SUBNETS_ROOT_PATH, SUBNET_LOGO_FILE, SUBNETS_FOLDER_URL, SUBNET_INFO_FILE } from './constants.mjs';
import { getChains } from './getChains.mjs';

const allChains = getChains();

export function createSubnet(subnetId) {
  const subnetInfo = JSON.parse(fs.readFileSync(path.resolve(SUBNETS_ROOT_PATH, subnetId, SUBNET_INFO_FILE)));
  const hasPng = fs.readdirSync(path.resolve(SUBNETS_ROOT_PATH, subnetId), 'utf8').includes(SUBNET_LOGO_FILE);
  return {
    ...subnetInfo,
    chains: allChains
      .filter((chainInfo) => chainInfo.subnetId === subnetId)
      .map((chainInfo) => createChain(chainInfo.chainId)),
    ...(!!hasPng && { logoUri: `${SUBNETS_FOLDER_URL}/${subnetId}/${SUBNET_LOGO_FILE}` }),
  };
}
