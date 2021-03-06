import fs from 'fs';
import path from 'path';
import {
  ROOT_PATH,
  CHAIN_INFO_FILE,
  CHAIN_LOGO_FILE,
  NATIVE_TOKEN_LOGO_FILE,
  CONTRACT_TOKEN_INFO_FILE,
} from './constants.mjs';

export function getTokens(chainId, chainTokenIds) {
  return fs
    .readdirSync(chainTokenIds)
    .filter((pathValue) => ![CHAIN_INFO_FILE, CHAIN_LOGO_FILE, NATIVE_TOKEN_LOGO_FILE].includes(pathValue))
    .map((tokenPath) => {
      return JSON.parse(
        fs.readFileSync(path.resolve(ROOT_PATH, chainId.toString(), tokenPath, CONTRACT_TOKEN_INFO_FILE), 'utf8')
      );
    });
}

export function getTokensWithAddresses(chainId, chainTokenIds) {
  return fs
    .readdirSync(chainTokenIds)
    .filter((pathValue) => ![CHAIN_INFO_FILE, CHAIN_LOGO_FILE, NATIVE_TOKEN_LOGO_FILE].includes(pathValue))
    .map((tokenPath) => {
      return {
        address: tokenPath,
        tokenInfo: JSON.parse(
          fs.readFileSync(path.resolve(ROOT_PATH, chainId.toString(), tokenPath, CONTRACT_TOKEN_INFO_FILE), 'utf8')
        ),
      };
    });
}
