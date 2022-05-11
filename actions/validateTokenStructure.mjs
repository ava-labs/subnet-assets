import fs from "fs";
import path from "path";
import {
  ROOT_PATH,
  CHAIN_INFO_FILE,
  CHAIN_LOGO_FILE,
  NATIVE_TOKEN_LOGO_FILE,
  CONTRACT_TOKEN_INFO_FILE,
  TOKEN_LOGO_FILE,
} from "./constants.mjs";

function validateToken(token, tokenContractInfoPath, tokenDirPath) {
  const values = {
    logoUri: token.hasOwnProperty("logoUri"),
    address: token.hasOwnProperty("address"),
    name: token.hasOwnProperty("name"),
    description: token.hasOwnProperty("description"),
    contractType: token.hasOwnProperty("contractType"),
    assetType: token.hasOwnProperty("assetType"),
    officialSite: token.hasOwnProperty("officialSite"),
    resourceLinks: token.hasOwnProperty("resourceLinks"),
    symbol: token.hasOwnProperty("symbol"),
    hasLogo: fs.existsSync(path.resolve(tokenDirPath, TOKEN_LOGO_FILE)),
  };

  const invalidKeys = Object.keys(values).reduce((acc, key) => {
    return !values[key] ? [...acc, key] : acc;
  }, []);

  return {
    isInvalid: !!invalidKeys.length,
    values,
    token,
    tokenContractInfoPath,
    tokenDirPath,
  };
}

function getInvalidTokens(chainId, chainTokenIds) {
  return fs
    .readdirSync(chainTokenIds)
    .filter(
      (pathValue) =>
        ![CHAIN_INFO_FILE, CHAIN_LOGO_FILE, NATIVE_TOKEN_LOGO_FILE].includes(
          pathValue
        )
    )
    .map((tokenId) =>
      path.resolve(ROOT_PATH, chainId, tokenId, CONTRACT_TOKEN_INFO_FILE)
    )
    .map((tokenPath) => {
      const token = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
      return validateToken(
        token,
        tokenPath,
        path.resolve(ROOT_PATH, chainId, token.address)
      );
    })
    .filter(
      (validatedToken) =>
        validatedToken.isInvalid &&
        validatedToken.token.contractType === "ERC-20"
    );
}

export const invalidTokens = fs.readdirSync(ROOT_PATH).map((chainId) => {
  // this is all chain paths. ie.../subnet-assets/chains/11111
  return getInvalidTokens(chainId, path.resolve(ROOT_PATH, chainId));
});
