import fs from 'fs';
import { getSubnets } from './getSubnets.mjs';
import { MAINNET_SUBNET_LIST_FILE, TESTNET_SUBNET_LIST_FILE } from './constants.mjs';
import { createSubnet } from './createSubnet.mjs';

const allSubnets = getSubnets();

const formattedSubnets = Object.values(allSubnets).map((subnetInfo) => createSubnet(subnetInfo.subnetId));

const mainnetSubnets = formattedSubnets.filter(({ isTestnet }) => !isTestnet);
const testnetSubnets = formattedSubnets.filter(({ isTestnet }) => isTestnet);

fs.writeFileSync(MAINNET_SUBNET_LIST_FILE, JSON.stringify(mainnetSubnets, null, 2));
fs.writeFileSync(TESTNET_SUBNET_LIST_FILE, JSON.stringify(testnetSubnets, null, 2));
