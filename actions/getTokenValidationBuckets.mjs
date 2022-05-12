import fs from "fs";
import path from "path";
import {
  CONTRACT_TOKEN_INFO_FILE,
  ROOT_PATH,
  TOKEN_LOGO_FILE,
} from "./constants.mjs";
import { getTokens } from "./getTokens.mjs";
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
  "chainId",
];

function validateToken(token, tokenContractInfoPath, tokenDirPath, chainId) {
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
    chainId,
  };
}

function getInvalidTokens(chainId, chainTokenIds) {
  return getTokens(chainId, chainTokenIds)
    .map((token) => {
      return validateToken(
        token,
        path.resolve(
          ROOT_PATH,
          chainId,
          token.address,
          CONTRACT_TOKEN_INFO_FILE
        ),
        path.resolve(ROOT_PATH, chainId, token.address),
        chainId
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
