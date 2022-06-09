export interface ContractInformation {
  address: string; // ChecksumAddress
  description: string;
  name: string;
  symbol?: string;
  contractType: 'ERC-20' | 'ERC-721' | 'Other';
  assetType: 'Fixed Cap' | 'Unlimited Cap' | 'Stablecoin' | 'NFT';
  officialSite?: string; // uri
  tags?: string[];
  email?: string;
  chainId: number;
  logoUri?: string; // uri
  resourceLinks?: ContractResourceLink[];
}

export type ContractResourceLink = {
  type:
    | 'Twitter'
    | 'Facebook'
    | 'Discord'
    | 'Telegram'
    | 'Blog'
    | 'Medium'
    | 'Whitepaper'
    | 'CoinGecko'
    | 'CoinMarketCap'
    | 'LinkedIn'
    | 'Reddit'
    | 'Support'
    | 'Github';
  url: string; // uri
};
