import {
  invalidTokensBuckets,
  invalidTokensList,
  tokenValidationKeys,
} from "./validateTokenStructure.mjs";

console.log("number of invalid tokens: ", invalidTokensList.length);

console.log("Keys being validated: ", tokenValidationKeys);

console.log(
  "token errors per buckets: ",
  tokenValidationKeys.reduce((acc, key) => {
    return { ...acc, [key]: invalidTokensBuckets[key].length };
  }, {})
);
