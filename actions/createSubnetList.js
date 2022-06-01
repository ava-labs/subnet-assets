import fs from 'fs';
import { getChains } from './getChains.mjs';
import { getSubnets } from './getSubnets.mjs';
import { MAINNET_SUBNET_LIST_FILE, TESTNET_SUBNET_LIST_FILE } from './constants.mjs';

const allSubnets = getSubnets();
const allChains = getChains();

const formattedSubnets = Object.values(allSubnets).map((subnetInfo) => ({
  ...subnetInfo,
  chains: allChains.filter((chainInfo) => chainInfo.subnetId === subnetInfo.subnetId),
}));

const mainnetSubnets = formattedSubnets.filter(({ isTestnet }) => !isTestnet);
const testnetSubnets = formattedSubnets.filter(({ isTestnet }) => isTestnet);

fs.writeFileSync(MAINNET_SUBNET_LIST_FILE, JSON.stringify(mainnetSubnets, null, 2));
fs.writeFileSync(TESTNET_SUBNET_LIST_FILE, JSON.stringify(testnetSubnets, null, 2));
