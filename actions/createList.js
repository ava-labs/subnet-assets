import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else if (path.extname(file) == '.json') {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

function replacer(key, value) {
  if(value instanceof Map) {
    return  Object.fromEntries(value) ;
  } else {
    return value;
  }
}

const __dirname = dirname(fileURLToPath(
  import.meta.url));
const chainPath = path.join(__dirname, "../chains")


const parseJSONFile = (path) => {
  try {
    const file = fs.readFileSync(path, 'utf8')
    return JSON.parse(file)
  } catch (e) {
    console.error(`error parsing ${path}`)
    console.error(e)
    process.exit(1)
  }
}

const currentTokenListPath = path.join(__dirname, '../tokenList.json')
const currentList = parseJSONFile(currentTokenListPath)
const files = getAllFiles(chainPath)
let chainIdMap = new Map()
files.forEach((fileName => {
  const isChainInfo = String(fileName).endsWith('chain-information.json')
  const chainId = fileName.match('chains/[0-9]+')[0].split('/')[1]
  if (chainIdMap.has(chainId)) { // Check if chain Id is in map
    let chainContentsMap = chainIdMap.get(chainId) // Contents map is a map containing the token information and chain information
    if (isChainInfo) { // If the current file is a chainId file, set the chain-information in the contents
      chainContentsMap.set('chain-information', parseJSONFile(fileName))
    }
    else {
      if (chainContentsMap.has('tokens')) { // If there are tokens in the chain-contents map, get the array and push to it
        let arrayOfTokens = chainContentsMap.get('tokens')
        arrayOfTokens.push(parseJSONFile(fileName))
        chainContentsMap.set('tokens', arrayOfTokens)
      }
      else { // If there are no tokens in the chain-contents map, create the array and add the token
        let arrayOfTokens = [parseJSONFile(fileName)]
        chainContentsMap.set('tokens', arrayOfTokens)
      }
    }
    chainIdMap.set(chainId, chainContentsMap)
  }
  else { // If the chain-contents map does not yet exist, create it and add the information
    let contentsMap = new Map()
    if (isChainInfo) {
      contentsMap.set('chain-information', parseJSONFile(fileName))
    }
    else {
      let arrayOfTokens = [parseJSONFile(fileName)]
      contentsMap.set('tokens', arrayOfTokens)
    }
    chainIdMap.set(chainId, contentsMap)
  }


}))
const validateTokens = (tokens) => {
  const existingAddress = new Set()
  tokens.forEach((token) => {
    if (existingAddress.has(token.address)) {
      console.error(`${token.address} is repeated`)
      process.exit(1)
    }
  })
}



fs.writeFileSync(currentTokenListPath, JSON.stringify({ chains: Object.fromEntries(chainIdMap) }, replacer , 2))