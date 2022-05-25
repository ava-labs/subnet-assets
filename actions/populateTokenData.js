import { getBasicCoingeckoHttp, coinsContractInfo } from '@avalabs/coingecko-sdk';
import { chainIdDictionary, ROOT_PATH, CONTRACT_TOKEN_INFO_FILE } from './constants.mjs'
import fs from "fs";
import path from "path";
import { getTokens } from "./getTokens.mjs";
import fetch from 'node-fetch'
import { utils } from 'ethers'
globalThis.fetch = fetch

const http = getBasicCoingeckoHttp();


fs.readdirSync(ROOT_PATH).forEach(async chainId => {
    // this is all chain paths. ie.../subnet-assets/chains/11111
    if ( chainId == 53935 || chainId == 43114) {
        const chainTokenIds = path.resolve(ROOT_PATH, chainId);
        getTokens(chainId, chainTokenIds).forEach(async (token, i) => {
            setTimeout(async () => {
                try {
                    const { symbol, name, description, market_data } = await coinsContractInfo(http, { assetPlatformId: chainIdDictionary[chainId], address: utils.getAddress(token.address) });
                    if (!token.name)
                        token.name = name;
                    if (!token.symbol)
                        token.symbol = symbol;
                    if (!token.description)
                        token.description = description.en;
                    if (!token.assetType)
                        token.assetType = market_data.max_supply ? 'Fixed Cap' : 'Unlimited Cap';
                    if (!token.contractType)
                        token.contractType = 'ERC-20'
                    fs.writeFileSync(path.resolve(ROOT_PATH, chainId, utils.getAddress(token.address), CONTRACT_TOKEN_INFO_FILE), JSON.stringify(token, null, 4))
                } catch (error) {
                    console.log(`Could not find token ${token.address} on chain ${chainId}`)
                }

            }, 1000 * i)
        })
    }

})

