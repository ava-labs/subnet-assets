import { getChains } from './getChains.mjs';
import fs from 'fs';
import { CHAIN_LIST_FILE } from './constants.mjs';

fs.writeFileSync(CHAIN_LIST_FILE, JSON.stringify(getChains(), null, 2));
