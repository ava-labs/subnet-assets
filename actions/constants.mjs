import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const ROOT_PATH = path.resolve("./chains");
export const CHAIN_INFO_FILE = "chain-information.json";
export const CHAIN_LOGO_FILE = "chain-logo.png";
export const NATIVE_TOKEN_LOGO_FILE = "token-logo.png";
export const TOKEN_LOGO_FILE = "logo.png";
export const CHAINS_FOLDER_URL =
  "https://github.com/ava-labs/subnet-assets/tree/main/chains";
export const TOKEN_LIST_FILE = path.resolve(__dirname, "../tokenList.json");
export const CONTRACT_TOKEN_INFO_FILE = "contract-information.json";
export const MAINNET_CHAIN_ID = 43114;
export const FUJI_CHAIN_ID = 43113;
