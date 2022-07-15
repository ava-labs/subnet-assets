import fs from 'fs';
import path from 'path';
import { ROOT_PATH, CHAIN_INFO_FILE, CHAIN_LOGO_FILE, NATIVE_TOKEN_LOGO_FILE } from './constants.mjs';

export function createChain(chainId, gitRef) {
  const chainInfo = JSON.parse(fs.readFileSync(path.resolve(ROOT_PATH, `${chainId}`, CHAIN_INFO_FILE), 'utf8'));
  const nativeTokenLogoFilePath = `${getChainsFolderUrl(gitRef)}/${chainId}/${NATIVE_TOKEN_LOGO_FILE}`;
  const chainLogoFilePath = `${getChainsFolderUrl(gitRef)}/${chainId}/${CHAIN_LOGO_FILE}`;

  return {
    ...chainInfo,
    logoUri: chainLogoFilePath,
    networkToken: {
      ...chainInfo.networkToken,
      logoUri: nativeTokenLogoFilePath,
    },
  };
}
