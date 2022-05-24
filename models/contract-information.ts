export interface ContractInformation {
  address: string // ChecksumAddress
  description: string
  name: string
  symbol?: string
  contractType: string // ERC-20, ERC-721, Other
  assetType: string // Fixed Cap, Unlimited Cap, Stablecoin, NFT
  officialSite?: string // uri
  tags?: string[]
  email?: string
  chainId: number
  logoUri?: string // uri
  resourceLinks?: {
    type: string //   Blog, Twitter, Github, Telegram, Discord, Whitepaper, CoinMarketCap, CoinGecko
    url: string // uri
  }[]
}
