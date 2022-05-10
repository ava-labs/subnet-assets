import axios from "axios";

export const MAINNET_TOKENLIST_URLS = [
  "https://raw.githubusercontent.com/pangolindex/tokenlists/main/top15.tokenlist.json",
  "https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json",
  "https://raw.githubusercontent.com/pangolindex/tokenlists/main/ab.tokenlist.json",
  "https://raw.githubusercontent.com/pangolindex/tokenlists/main/stablecoin.tokenlist.json",
  "https://raw.githubusercontent.com/pangolindex/tokenlists/main/aeb.tokenlist.json",
];

export const FUJI_TOKENLIST_URLS = [
  "https://raw.githubusercontent.com/dasconnor/tokenlist/main/fuji.tokenlist.json",
];

const values = Array.prototype.flat(
  MAINNET_TOKENLIST_URLS.map(async (url) => {
    const result = await axios.get(url);
    console.log(result.data.tokens);
  })
);

console.log(values);
