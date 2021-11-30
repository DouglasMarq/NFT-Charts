import Core from '../core';
import bindContainers from './container';
import Database from '../database';
import { existsSync } from 'fs';

import Debug from 'debug';
const debug = Debug('bot:init');

(async () => {
    if (await !existsSync(`${process.cwd()}/.env`)) {
        debug('.env not found, terminating bot.');
        process.exit(1);
    }

    debug(`Starting Bot`);
    const container = bindContainers();
    container.get<Database>(Database);
    container.get<Core>(Core);
})();
