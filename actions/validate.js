import fs from "fs";
import path from "path";
import chainInfoSchema from '../schema/chainInfoSchema.json'
import contractInfoSchema from '../schema/contractInfoSchema.json'
import * as core from '@actions/core'
import addFormats from 'ajv-formats'
import {
    ROOT_PATH,
    CHAIN_INFO_FILE,
} from "./constants.mjs";
import Ajv from "ajv";
import { getTokens } from "./getTokens.mjs";

let ajv = new Ajv({allErrors: true})
addFormats(ajv)

const validateChainInfo = ajv.compile(chainInfoSchema)
const validateContractInfo = ajv.compile(contractInfoSchema)
let err = []

const errors = fs.readdirSync(ROOT_PATH).reduce((acc, chainId) => {
    // this is all chain paths. ie.../subnet-assets/chains/11111
    const chainTokenIds = path.resolve(ROOT_PATH, chainId);

    const chainInfo = JSON.parse(
        fs.readFileSync(path.resolve(ROOT_PATH, chainId, CHAIN_INFO_FILE), "utf8")
    );
    
    validateChainInfo(chainInfo)
    let tokenErrors = getTokens(chainId, chainTokenIds).map(tokenInfo => {
        validateContractInfo(tokenInfo)
        return {[tokenInfo.address]: [...validateContractInfo.errors]};
    });
    return { ...acc, [chainId]: {chainErrors: [...validateChainInfo.errors],  tokenErrors: tokenErrors } };
}, {});

if(errors){
    core.setFailed(JSON.stringify(errors, null, 2))
}

