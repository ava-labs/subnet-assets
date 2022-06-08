export interface ChainInformation {
  chainId: number;
  chainName: string;
  description: string;
  platformChainId: string;
  subnetId: string;
  vmId: string;
  vmName: 'EVM' | 'BITCOIN' | 'ETHEREUM';
  subnetExplorerUriId?: string;
  explorerUrl?: string;
  rpcUrl: string; // uri
  wsUrl?: string; // uri
  isTestnet: boolean;
  utilityAddresses?: UtilityAddresses;
  pricingProviders?: PricingProvidersConfig;
  networkToken: NetworkToken;
}

export type PricingProviderConfig<T extends PricingProvider> = T extends 'coingecko' ? CoinGeckoConfiguration : never;

export type PricingProvidersConfig = {
  [K in PricingProvider]?: PricingProviderConfig<K>;
};

export const validProviderTypes = ['coingecko'] as const;

export type PricingProvider = typeof validProviderTypes[number];

export type CoinGeckoConfiguration = {
  nativeTokenId?: string;
  assetPlatformId?: string;
};

export type UtilityAddresses = {
  multicall: string; // ChecksumAddress
  // Other utility addresses go here.
};

export type NetworkToken = {
  name: string;
  symbol: string;
  description: string;
  decimals: number;
};
