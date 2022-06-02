import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import subnetGroupsSchema from '../schema/subnetGroupsSchema.json';
import addFormats from 'ajv-formats';
import Ajv from 'ajv';
import { SUBNET_GROUPS_FILE } from './constants.mjs';

let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateSubnetGroups = ajv.compile(subnetGroupsSchema);
validateSubnetGroups(JSON.parse(fs.readFileSync(SUBNET_GROUPS_FILE, 'utf8')));

if (validateSubnetGroups?.errors?.length > 0) {
  core.setFailed(JSON.stringify(validateSubnetGroups.errors, null, 2));
} else console.log('All checks passed');
