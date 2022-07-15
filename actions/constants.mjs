import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const gitRef = process.argv?.[2];
if (!gitRef) throw new Error('Missing $GITHUB_SHA or other git ref argument');

export const __dirname = dirname(fileURLToPath(import.meta.url));
export const __listsDirName = path.resolve(__dirname, '../_lists');

export const ROOT_PATH = path.resolve('./chains');
export const CHAIN_INFO_FILE = 'chain-information.json';
export const CHAIN_LOGO_FILE = 'chain-logo.png';
export const NATIVE_TOKEN_LOGO_FILE = 'token-logo.png';
export const TOKEN_LOGO_FILE = 'logo.png';
export const CHAINS_FOLDER_URL = `https://raw.githubusercontent.com/ava-labs/subnet-assets/${gitRef}/chains`;
export const ERC20_TOKEN_LIST_FILE = path.resolve(__listsDirName, 'tokenList.erc20.json');
export const ADDRESS_LIST_FILE = path.resolve(__listsDirName, 'addressList.json');
export const CONTRACT_TOKEN_INFO_FILE = 'contract-information.json';
export const MAINNET_CHAIN_ID = 43114;
export const FUJI_CHAIN_ID = 43113;
export const SUBNET_EXPLORER_MAINNET_CHAIN_LIST_FILE = path.resolve(
  __listsDirName,
  'subnetExplorer/mainnetChains.json'
);
export const SUBNET_EXPLORER_TESTNET_CHAIN_LIST_FILE = path.resolve(
  __listsDirName,
  'subnetExplorer/testnetChains.json'
);
export const SUBNET_EXPLORER_MAINNET_CONTRACT_LIST_FILE = path.resolve(
  __listsDirName,
  'subnetExplorer/mainnetContracts.json'
);
export const SUBNET_EXPLORER_TESTNET_CONTRACT_LIST_FILE = path.resolve(
  __listsDirName,
  'subnetExplorer/testnetContracts.json'
);
