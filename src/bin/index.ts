import Core from '../core';
import bindContainers from './container';
import Database from '../database';

import Debug from 'debug';
const debug = Debug('bot:init');

(() => {
    debug(`Starting Bot`);
    const container = bindContainers();
    container.get<Database>(Database);
    container.get<Core>(Core);
})();
