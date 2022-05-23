import fs from "fs";
import path from "path";
import {
  ROOT_PATH,
  CHAIN_INFO_FILE,
  CHAIN_LOGO_FILE,
  NATIVE_TOKEN_LOGO_FILE,
  CHAINS_FOLDER_URL,
  ERC20_TOKEN_LIST_FILE,
} from "./constants.mjs";
import { getTokens } from "./getTokens.mjs";

function createChain(chainId, chainTokenIds) {
  const chainInfo = JSON.parse(
    fs.readFileSync(path.resolve(ROOT_PATH, chainId, CHAIN_INFO_FILE), "utf8")
  );
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

fs.writeFileSync(ERC20_TOKEN_LIST_FILE, JSON.stringify(chains, null, 2));
