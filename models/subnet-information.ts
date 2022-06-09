export interface SubnetInformation {
  subnetId: string;
  subnetName: string;
  isTestnet: boolean;
  description?: string;
  officialSite?: string;
  resourceLinks?: SubnetResourceLink[];
}

export type SubnetResourceLink = {
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
    | 'Github'
    | 'Documentation';
  url: string; // uri
};
