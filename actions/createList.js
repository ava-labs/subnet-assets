import fs from "fs";
import path, { dirname } from "path";

const ROOT_PATH = path.resolve("./chains");
const CHAIN_INFO_FILE = "chain-information.json";
const CHAIN_LOGO_FILE = "chain-logo.png";
const NATIVE_TOKEN_LOGO_FILE = "token-logo.png";
const CONTRACT_TOKEN_INFO_FILE = "contract-information.json";
const CHAINS_FOLDER_URL =
  "https://github.com/ava-labs/subnet-assets/tree/main/chains";
const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN_LIST_FILE = path.resolve(__dirname, "../tokenList.json");
import { fileURLToPath } from "url";

function getTokens(chainId, chainTokenIds) {
  return fs
    .readdirSync(chainTokenIds)
    .filter(
      (pathValue) =>
        ![CHAIN_INFO_FILE, CHAIN_LOGO_FILE, NATIVE_TOKEN_LOGO_FILE].includes(
          pathValue
        )
    )
    .map((tokenPath) =>
      JSON.parse(
        fs.readFileSync(
          path.resolve(ROOT_PATH, chainId, tokenPath, CONTRACT_TOKEN_INFO_FILE),
          "utf8"
        )
      )
    );
}

function createChain(chainId, chainTokenIds) {
  const chainInfo = JSON.parse(
    fs.readFileSync(path.resolve(ROOT_PATH, chainId, CHAIN_INFO_FILE), "utf8")
  );
  const nativeTokenLogoFilePath = `${CHAINS_FOLDER_URL}/${chainId}/${NATIVE_TOKEN_LOGO_FILE}`;
  const chainLogoFilePath = `${CHAINS_FOLDER_URL}/${chainId}/${CHAIN_LOGO_FILE}`;
  return {
    ...chainInfo,
    logoUrl: nativeTokenLogoFilePath,
    networkToken: {
      ...chainInfo.networkToken,
      logoUrl: chainLogoFilePath,
    },
    tokens: getTokens(chainId, chainTokenIds),
  };
}

const chains = fs.readdirSync(ROOT_PATH).reduce((acc, chainId) => {
  // this is all chain paths. ie.../subnet-assets/chains/11111
  const chainTokenIds = path.resolve(ROOT_PATH, chainId);

  const chain = {
    ...createChain(chainId, chainTokenIds),
    tokens: getTokens(chainId, chainTokenIds).filter(
      (token) => token.contractType === "ERC-20"
    ),
  };

  return { ...acc, [chain.chainId]: chain };
}, {});

fs.writeFileSync(TOKEN_LIST_FILE, JSON.stringify(chains, null, 2));
