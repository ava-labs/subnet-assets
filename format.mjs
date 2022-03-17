import {join} from 'node:path';
import {renameSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {getAddress} from '@ethersproject/address';

const ASSETS = './subnets/mainnet/43114';

for (const name of readdirSync(ASSETS)) {
	const filepath = join(ASSETS, name)
	const data = readFileSync(filepath);

	writeFileSync(filepath, JSON.stringify(JSON.parse(data), null, 4));
	const address = name.split('.')[0]

	renameSync(filepath, join(ASSETS, getAddress(address) + ".json"));
}