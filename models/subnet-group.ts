export interface SubnetGroups {
  [subnetGroupId: string]: SubnetGroup;
}

export interface SubnetGroup {
  subnetId: string;
  subnetName: string;
  isTestnet: boolean;
  explorerUri?: string;
}
