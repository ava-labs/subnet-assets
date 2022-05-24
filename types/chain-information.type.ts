export interface ChainInformation {
  chainName: string
  description: string
  platformChainId: string
  subnetId: string
  vmId: string
  vmName: string
  rpcUrl: string // uri
  wsUrl?: string // uri
  multicallAddress?: string // ChecksumAddress
  isTestnet: boolean
  networkToken: {
    name: string
    symbol: string
    description: string
    decimals: number
    coingeckoId?: string
  }
  coingeckoAssetPlatformId?: string
  chainId: string
}
