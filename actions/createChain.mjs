import fs from 'fs';
import path from 'path';
import {
  ROOT_PATH,
  CHAIN_INFO_FILE,
  CHAIN_LOGO_FILE,
  NATIVE_TOKEN_LOGO_FILE,
  CHAINS_FOLDER_URL,
} from './constants.mjs';

export function createChain(chainId) {
  const chainInfo = JSON.parse(fs.readFileSync(path.resolve(ROOT_PATH, chainId, CHAIN_INFO_FILE), 'utf8'));
  const nativeTokenLogoFilePath = `${CHAINS_FOLDER_URL}/${chainId}/${NATIVE_TOKEN_LOGO_FILE}`;
  const chainLogoFilePath = `${CHAINS_FOLDER_URL}/${chainId}/${CHAIN_LOGO_FILE}`;

  return {
    ...chainInfo,
    logoUri: nativeTokenLogoFilePath,
    networkToken: {
      ...chainInfo.networkToken,
      logoUri: chainLogoFilePath,
    },
  };
}
