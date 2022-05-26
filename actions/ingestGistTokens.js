import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { __dirname, CONTRACT_TOKEN_INFO_FILE, FUJI_CHAIN_ID, MAINNET_CHAIN_ID } from './constants.mjs';

export const MAINNET_TOKENLIST_URLS = [
  'https://raw.githubusercontent.com/pangolindex/tokenlists/main/top15.tokenlist.json',
  'https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json',
  'https://raw.githubusercontent.com/pangolindex/tokenlists/main/ab.tokenlist.json',
  'https://raw.githubusercontent.com/pangolindex/tokenlists/main/stablecoin.tokenlist.json',
  'https://raw.githubusercontent.com/pangolindex/tokenlists/main/aeb.tokenlist.json',
];

export const FUJI_TOKENLIST_URLS = ['https://raw.githubusercontent.com/dasconnor/tokenlist/main/fuji.tokenlist.json'];

MAINNET_TOKENLIST_URLS.map(async (url) => {
  const result = await axios.get(url);
  const tokens = result.data.tokens;
  tokens
    .map((result) => {
      const { logoURI, ...token } = result;
      return {
        ...token,
        logoUrl: logoURI,
        contractType: 'ERC-20',
        resourceLinks: [],
      };
    })
    .forEach((token) => {
      const tokenPath = path.resolve(__dirname, '../chains', `${MAINNET_CHAIN_ID}`, token.address);

      if (!fs.existsSync(tokenPath)) {
        fs.mkdirSync(tokenPath);
        fs.writeFileSync(path.resolve(tokenPath, CONTRACT_TOKEN_INFO_FILE), JSON.stringify(token, null, 2));
      }
    });
});

FUJI_TOKENLIST_URLS.map(async (url) => {
  const result = await axios.get(url);
  const tokens = result.data.tokens;
  tokens
    .map((result) => {
      const { logoURI, ...token } = result;
      return {
        ...token,
        logoUrl: logoURI,
        contractType: 'ERC-20',
        resourceLinks: [],
      };
    })
    .forEach((token) => {
      const tokenPath = path.resolve(__dirname, '../chains', `${FUJI_CHAIN_ID}`, token.address);

      if (!fs.existsSync(tokenPath)) {
        fs.mkdirSync(tokenPath);
        fs.writeFileSync(path.resolve(tokenPath, CONTRACT_TOKEN_INFO_FILE), JSON.stringify(token, null, 2));
      }
    });
});
