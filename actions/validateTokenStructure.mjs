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

export const tokenValidationKeys = [
  "logoUri",
  "address",
  "name",
  "description",
  "contractType",
  "assetType",
  "officialSite",
  "resourceLinks",
  "symbol",
  "hasLogo",
];

function validateToken(token, tokenContractInfoPath, tokenDirPath) {
  const valuesRes = tokenValidationKeys.reduce((acc, key) => {
    return { ...acc, [key]: token.hasOwnProperty(key) };
  }, {});

  const values = {
    ...valuesRes,
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

export const invalidTokensList = fs
  .readdirSync(ROOT_PATH)
  .reduce((acc, chainId) => {
    // this is all chain paths. ie.../subnet-assets/chains/11111
    const invalidToks = getInvalidTokens(
      chainId,
      path.resolve(ROOT_PATH, chainId)
    );

    return [...invalidToks, ...acc];
  }, []);

export const invalidTokensBuckets = tokenValidationKeys.reduce((acc, key) => {
  return {
    ...acc,
    [key]: invalidTokensList.filter((validationStatus) => {
      return !validationStatus.values[key];
    }),
  };
}, {});
