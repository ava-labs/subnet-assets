import fs from 'fs';
import path from 'path';
import { getChains } from './getChains.mjs';
import { createChain } from './createChain.mjs';
import { getSubnets } from './getSubnets.mjs';
import {
  MAINNET_SUBNET_LIST_FILE,
  SUBNETS_ROOT_PATH,
  TESTNET_SUBNET_LIST_FILE,
  SUBNET_LOGO_FILE,
  SUBNETS_FOLDER_URL,
} from './constants.mjs';

const allSubnets = getSubnets();
const allChains = getChains();

const formattedSubnets = Object.values(allSubnets).map((subnetInfo) => {
  const hasPng = fs
    .readdirSync(path.resolve(SUBNETS_ROOT_PATH, subnetInfo.subnetId), 'utf8')
    .includes(SUBNET_LOGO_FILE);

  return {
    ...subnetInfo,
    chains: allChains
      .filter((chainInfo) => chainInfo.subnetId === subnetInfo.subnetId)
      .map((chainInfo) => createChain(chainInfo.chainId)),
    ...(hasPng && { logoUri: `${SUBNETS_FOLDER_URL}/${subnetInfo.subnetId}/${SUBNET_LOGO_FILE}` }),
  };
});

const mainnetSubnets = formattedSubnets.filter(({ isTestnet }) => !isTestnet);
const testnetSubnets = formattedSubnets.filter(({ isTestnet }) => isTestnet);

fs.writeFileSync(MAINNET_SUBNET_LIST_FILE, JSON.stringify(mainnetSubnets, null, 2));
fs.writeFileSync(TESTNET_SUBNET_LIST_FILE, JSON.stringify(testnetSubnets, null, 2));
