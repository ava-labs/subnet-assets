export function getSubnetGroups() {
  return JSON.parse(fs.readFileSync(SUBNET_GROUPS_FILE, 'utf8'));
}
