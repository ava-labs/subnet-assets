import getColors from 'get-image-colors'
import async from 'async';

export async function createTokens(tokens) {
  const tokensWithAverageColor = await async.map(tokens, async (token) => {
    if (token.logoUri) {
      try {
        const color = await getColors(token.logoUri, {count: 1})
        
        return {
          ...token,
          tokenColor: color.map(color => color.hex())[0],
        };
      } catch (err) {
        console.log('Error: ', err);
      }
    }
    return token;
  });

  return tokensWithAverageColor.filter((token) => token.contractType === 'ERC-20')
}
