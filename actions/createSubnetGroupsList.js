import fs from 'fs';
import path from 'path';
import { getChains } from './getChains.mjs';
import { createChain } from './createChain.mjs';
import {
  SUBNETS_ROOT_PATH,
  SUBNET_INFO_FILE,
  SUBNET_GROUPS_FILE,
  FORMATTED_SUBNET_GROUPS_FILE,
  SUBNETS_FOLDER_URL,
  SUBNET_LOGO_FILE,
} from './constants.mjs';

const allChains = getChains();

function createSubnet(subnetId) {
  const subnetInfo = JSON.parse(fs.readFileSync(path.resolve(SUBNETS_ROOT_PATH, subnetId, SUBNET_INFO_FILE), 'utf8'));
  const chains = allChains
    .filter((chainInfo) => chainInfo.subnetId === subnetId)
    .map((chainInfo) => createChain(chainInfo.chainId));
  const subnetLogoFilePath = `${SUBNETS_FOLDER_URL}/${subnetId}/${SUBNET_LOGO_FILE}`;

  return {
    ...subnetInfo,
    chains,
    logoUri: subnetLogoFilePath,
  };
}

const subnetGroups = JSON.parse(fs.readFileSync(SUBNET_GROUPS_FILE, 'utf8'));

const formattedSubnetGroups = Object.values(subnetGroups).map(
  ({ mainnetSubnetId, testnetSubnetId, ...subnetGroupInfo }) => {
    const formattedSubnetGroup = { ...subnetGroupInfo };
    if (mainnetSubnetId?.length) {
      formattedSubnetGroup.mainnetSubnet = createSubnet(mainnetSubnetId);
    }
    if (testnetSubnetId?.length) {
      formattedSubnetGroup.testnetSubnet = createSubnet(testnetSubnetId);
    }

    return formattedSubnetGroup;
  }
);

fs.writeFileSync(FORMATTED_SUBNET_GROUPS_FILE, JSON.stringify(formattedSubnetGroups, null, 2));
