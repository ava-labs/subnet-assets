export type ChainInformation = {
  chainName: string
  description: string
  platformChainId: string
  subnetId: string
  vmId: string
  vmName: string
  rpcUrl: string
  wsUrl: string
  multicallAddress: string
  isTestnet: boolean
  networkToken: {
    name: string
    symbol: string
    description: string
    decimals: number
    coingeckoId: string
  }
  coingeckoAssetPlatformId: string
  chainId: string
}
