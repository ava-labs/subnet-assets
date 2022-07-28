import getColors from 'get-image-colors';
import path from 'path';
import fs from 'fs';
import { getContractLogoUrl, ROOT_PATH, TOKEN_LOGO_FILE, __dirname } from './constants.mjs';

export async function createTokens(tokens, contractTypeFilter) {
  return Promise.all(
    tokens
      .filter((token) => (contractTypeFilter ? token.contractType === contractTypeFilter : true))
      .map(async (token) => {
        try {
          const hasLogoFile = fs
            .readdirSync(`${ROOT_PATH}/${token.chainId}/${token.address}`)
            .includes(TOKEN_LOGO_FILE);
          const logoUri = hasLogoFile ? getContractLogoUrl(token.chainId, token.address) : undefined;
          const tokenColor = hasLogoFile
            ? (await getColors(logoUri, { count: 1 }))?.map((color) => color.hex())[0]
            : undefined;

          return {
            ...token,
            logoUri,
            tokenColor,
          };
        } catch (err) {
          console.log(err);
        }
        return token;
      })
  );
}
