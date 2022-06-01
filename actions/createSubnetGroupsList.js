import fs from 'fs';
import path from 'path';
import { SUBNETS_ROOT_PATH, SUBNET_INFO_FILE, SUBNET_GROUPS_FILE, FORMATTED_SUBNET_GROUPS_FILE } from './constants.mjs';

function createSubnet(subnetId) {
  return JSON.parse(fs.readFileSync(path.resolve(SUBNETS_ROOT_PATH, subnetId, SUBNET_INFO_FILE), 'utf8'));
}

const subnetGroups = JSON.parse(fs.readFileSync(SUBNET_GROUPS_FILE, 'utf8'));

const formattedSubnetGroups = Object.values(subnetGroups).map(
  ({ mainnetSubnetIds, testnetSubnetIds, ...subnetGroupInfo }) => {
    const formattedSubnetGroup = { ...subnetGroupInfo };
    if (mainnetSubnetIds?.length) {
      formattedSubnetGroup.mainnetSubnetIds = mainnetSubnetIds.map((subnetId) => createSubnet(subnetId));
    }
    if (testnetSubnetIds?.length) {
      formattedSubnetGroup.testnetSubnetIds = testnetSubnetIds.map((subnetId) => createSubnet(subnetId));
    }
    return formattedSubnetGroup;
  }
);

fs.writeFileSync(FORMATTED_SUBNET_GROUPS_FILE, JSON.stringify(formattedSubnetGroups, null, 2));
