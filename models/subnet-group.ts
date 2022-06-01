export interface SubnetGroups {
  [subnetGroupId: string]: SubnetGroup;
}

export interface SubnetGroup {
  subnetGroupName: string;
  mainnetSubnetIds?: string[];
  testnetSubnetIds?: string[];
}
