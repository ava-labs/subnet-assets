import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import subnetInfoSchema from '../schema/subnetInfoSchema.json';
import subnetGroupsSchema from '../schema/subnetGroupsSchema.json';
import addFormats from 'ajv-formats';
import Ajv from 'ajv';
import { SUBNETS_ROOT_PATH, SUBNET_GROUPS_FILE, SUBNET_INFO_FILE } from './constants.mjs';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateSubnetInfo = ajv.compile(subnetInfoSchema);

let isError = false;
const errors = {};
fs.readdirSync(SUBNETS_ROOT_PATH).forEach((subnetId) => {
  // Subnet groups file is validated separately
  if (subnetId === 'subnet-groups.json') return;

  const subnetFilePath = path.resolve(SUBNETS_ROOT_PATH, subnetId, SUBNET_INFO_FILE);
  const subnetInfo = JSON.parse(fs.readFileSync(subnetFilePath, 'utf8'));
  validateSubnetInfo(subnetInfo);

  if (validateSubnetInfo.errors) {
    errors[subnetId] = validateSubnetInfo.errors;
    isError = true;
  }
}, {});

if (isError) {
  core.setFailed(JSON.stringify(errors, null, 2));
} else console.log('All checks passed');
