import getColors from 'get-image-colors';
import fs from 'fs';
import { ROOT_PATH, TOKEN_LOGO_FILE } from './constants.mjs';

export async function createTokens(tokens, contractTypeFilter) {
  return Promise.all(
    tokens
      .filter((token) => (contractTypeFilter ? token.contractType === contractTypeFilter : true))
      .map(async (token) => {
        if (token.logoUri) {
          try {
            const color = await getColors(token.logoUri, { count: 1 });
            const hasLogoFile = fs
              .readdirSync(`${ROOT_PATH}/${token.chainId}/${token.address}`)
              .includes(TOKEN_LOGO_FILE);

            return {
              ...token,
              logoUri: hasLogoFile ? `${ROOT_PATH}/${token.chainId}/${token.address}/${TOKEN_LOGO_FILE}` : undefined,
              tokenColor: color.map((color) => color.hex())[0],
            };
          } catch (err) {
            console.log(err);
          }
        }
        return token;
      })
  );
}
