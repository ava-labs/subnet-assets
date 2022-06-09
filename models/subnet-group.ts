export interface ChainGroup {
  mainnet: number;
  testnet: number;
}
export interface SubnetGroup {
  subnetGroupName: string;
  subnetExplorerUriId?: string;
  mainnetSubnetId?: string;
  testnetSubnetId?: string;
  chainGroups?: ChainGroup[];
}
