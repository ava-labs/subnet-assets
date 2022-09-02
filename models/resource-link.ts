export type ResourceLink = {
  type:
    | 'Blog'
    | 'CoinGecko'
    | 'CoinMarketCap'
    | 'Discord'
    | 'Documentation'
    | 'Facebook'
    | 'Github'
    | 'Instagram'
    | 'LinkedIn'
    | 'Medium'
    | 'Reddit'
    | 'Support'
    | 'Telegram'
    | 'TikTok'
    | 'Twitter'
    | 'Whitepaper';
  url: string; // uri
};
