import fs from 'fs';
import path from 'path';
import { getChains } from './getChains.mjs';
import { createChain } from './createChain.mjs';
import { SUBNETS_ROOT_PATH, SUBNET_INFO_FILE, SUBNET_GROUPS_FILE, FORMATTED_SUBNET_GROUPS_FILE } from './constants.mjs';

const allChains = getChains();

function createSubnet(subnetId) {
  const subnetInfo = JSON.parse(fs.readFileSync(path.resolve(SUBNETS_ROOT_PATH, subnetId, SUBNET_INFO_FILE), 'utf8'));
  const chains = allChains
    .filter((chainInfo) => chainInfo.subnetId === subnetId)
    .map((chainInfo) => createChain(chainInfo.chainId));
  return {
    ...subnetInfo,
    chains,
  };
}

const subnetGroups = JSON.parse(fs.readFileSync(SUBNET_GROUPS_FILE, 'utf8'));

const formattedSubnetGroups = Object.values(subnetGroups).map(
  ({ mainnetSubnetIds, testnetSubnetIds, ...subnetGroupInfo }) => {
    const formattedSubnetGroup = { ...subnetGroupInfo };
    if (mainnetSubnetIds?.length) {
      formattedSubnetGroup.mainnetSubnets = mainnetSubnetIds.map((subnetId) => createSubnet(subnetId));
    }
    if (testnetSubnetIds?.length) {
      formattedSubnetGroup.testnetSubnets = testnetSubnetIds.map((subnetId) => createSubnet(subnetId));
    }
    return formattedSubnetGroup;
  }
);

fs.writeFileSync(FORMATTED_SUBNET_GROUPS_FILE, JSON.stringify(formattedSubnetGroups, null, 2));
