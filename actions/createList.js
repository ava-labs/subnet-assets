import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else if (path.extname(file) == '.json'){
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
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
    const chainId = fileName.match('chains/[0-9]+')[0].split('/')[1]
    if (chainIdMap.has(chainId)){
      let arrayOfTokens = chainIdMap.get(chainId)
      arrayOfTokens.push(parseJSONFile(fileName))
      chainIdMap.set(chainId, arrayOfTokens)
    }
    else{
      let arrayOfTokens = [parseJSONFile(fileName)]
      chainIdMap.set(chainId, arrayOfTokens)
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

fs.writeFileSync(currentTokenListPath, JSON.stringify({ tokens: Object.fromEntries(chainIdMap) }, null, 2))