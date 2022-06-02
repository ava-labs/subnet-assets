import fs from 'fs';
import { SUBNET_GROUPS_FILE } from './constants.mjs';

export function getSubnetGroups() {
  return JSON.parse(fs.readFileSync(SUBNET_GROUPS_FILE, 'utf8'));
}
