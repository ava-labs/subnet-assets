import getColors from 'get-image-colors'

export async function createTokens(tokens) {
  return Promise.all(
    tokens
      .filter((token) => token.contractType === 'ERC-20')
      .map(async (token) => {
        if (token.logoUri) {
          try {
            const color = await getColors(token.logoUri, { count: 1 })

            return {
              ...token,
              tokenColor: color.map(color => color.hex())[0],
            };
          } catch (err) {
            console.log(err);
          }
        }
        return token;
      })
  );
}
