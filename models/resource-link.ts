export type ResourceLink = {
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
