import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import addFormats from 'ajv-formats';
import { ROOT_PATH, CHAIN_INFO_FILE } from './constants.mjs';
import Ajv from 'ajv';
import { getTokensWithAddresses } from './getTokens.mjs';
import chainInfoSchema from '../schema/chainInfoSchema.json';
import contractInfoSchema from '../schema/contractInfoSchema.json';
import { getAddress, isAddress } from '@ethersproject/address';

let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateChainInfo = ajv.compile(chainInfoSchema);
const validateContractInfo = ajv.compile(contractInfoSchema);

let errors = fs.readdirSync(ROOT_PATH).reduce((acc, chainId) => {
  // this is all chain paths. ie.../subnet-assets/chains/11111
  const chainTokenIds = path.resolve(ROOT_PATH, chainId);

  const chainInfo = JSON.parse(fs.readFileSync(path.resolve(ROOT_PATH, chainId, CHAIN_INFO_FILE), 'utf8'));

  validateChainInfo(chainInfo);
  let chainErrors = { ...validateChainInfo.errors };

  if (chainInfo.chainId != Number(chainId))
    chainErrors = {
      ...chainErrors,
      [Object.keys(chainErrors).length]: {
        type: 'ChainId mismatch',
        message: `ChainId ${chainInfo.chainId} in file does not match ${chainId}`,
      },
    };

  let tokenErrors = getTokensWithAddresses(chainId, chainTokenIds).reduce((acc, { address, tokenInfo }) => {
    validateContractInfo(tokenInfo);
    let tokenError = { ...validateContractInfo.errors };
    if (tokenInfo.address != address)
      tokenError = {
        ...tokenError,
        [Object.keys(tokenError).length]: {
          type: 'Address mismatch',
          message: `${tokenInfo.address} in file does not match ${address}`,
        },
      };
    if (isAddress(tokenInfo.address) && tokenInfo.address != getAddress(tokenInfo.address))
      tokenError = {
        ...tokenError,
        [Object.keys(tokenError).length]: {
          type: 'Bad Checksum',
          message: `${tokenInfo.address} not properly checksummed`,
        },
      };
    if (tokenInfo.chainId != Number(chainId))
      tokenError = {
        ...tokenError,
        [Object.keys(tokenError).length]: {
          type: 'ChainId mismatch',
          message: `ChainId ${tokenInfo.chainId} in file does not match ${chainId}`,
        },
      };
    if (Object.keys(tokenError).length > 0) return { ...acc, [address]: tokenError };
    return { ...acc };
  }, {});

  return {
    ...acc,
    [chainId]: {
      chainErrors: { ...chainErrors },
      tokenErrors: { ...tokenErrors },
    },
  };
}, {});

errors = Object.entries(errors).filter(([chainId, errorType]) => {
  if (Object.keys(errorType.chainErrors).length == 0) delete errorType.chainErrors;
  if (Object.keys(errorType.tokenErrors) == 0) delete errorType.tokenErrors;

  return Object.keys(errorType).length != 0;
});

if (errors.length > 0) {
  core.setFailed(JSON.stringify(errors, null, 2));
} else console.log('All checks passed');
