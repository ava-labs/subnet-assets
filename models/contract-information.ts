import { ResourceLink } from './resource-link';

export interface ContractInformation {
  address: string; // ChecksumAddress
  description: string;
  name: string;
  symbol?: string;
  contractType: 'ERC-20' | 'ERC-721' | 'Other';
  assetType: 'Fixed Cap' | 'Variable Cap' | 'Unlimited Cap' | 'Stablecoin' | 'NFT';
  officialSite?: string; // uri
  tags?: string[];
  email?: string;
  chainId: number;
  logoUri?: string; // uri
  resourceLinks?: ResourceLink[];
}
