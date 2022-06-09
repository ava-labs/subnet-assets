import fs from 'fs';
import { SUBNET_GROUPS_FILE, FORMATTED_SUBNET_GROUPS_FILE } from './constants.mjs';
import { createSubnet } from './createSubnet.mjs';

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
