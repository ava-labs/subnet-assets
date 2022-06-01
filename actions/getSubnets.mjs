import fs from 'fs';
import path from 'path';
import { ROOT_PATH, SUBNETS_ROOT_PATH, SUBNET_GROUPS_FILE, SUBNET_INFO_FILE } from './constants.mjs';

export function getSubnets() {
  return fs.readdirSync(SUBNETS_ROOT_PATH).map((subnetId) => {
    if (subnetId === SUBNET_GROUPS_FILE) return;
    return JSON.parse(fs.readFileSync(path.resolve(SUBNETS_ROOT_PATH, subnetId, SUBNET_INFO_FILE), 'utf8'));
  });
}
