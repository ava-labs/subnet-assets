import {
  invalidTokensBuckets,
  invalidTokensList,
  tokenValidationKeys,
} from "./validateTokenStructure.mjs";
import fs from "fs";
import path from "path";

console.log("number of invalid tokens: ", invalidTokensList.length);

console.log("Keys being validated: ", tokenValidationKeys);

console.log(
  "token errors per buckets: ",
  tokenValidationKeys.reduce((acc, key) => {
    return { ...acc, [key]: invalidTokensBuckets[key].length };
  }, {})
);

invalidTokensBuckets.logoUri.forEach((validation) => {
  const { logoUrl, ...validToken } = validation.token;
  const token = { ...validToken, logoUri: validation.token.logoUrl };
  JSON.stringify(token, null, 2);
  // console.log(validation.tokenContractInfoPath, token);
  // validation.fs.writeFileSync(
  //   path.resolve(tokenPath, CONTRACT_TOKEN_INFO_FILE),
  //   JSON.stringify(token, null, 2)
  // );
});
