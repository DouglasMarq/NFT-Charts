import Core from '../core';
import bindContainers from './container';

import Debug from 'debug';
const debug = Debug('bot:init');

(() => {
    debug(`Starting Bot`);
    const container = bindContainers();
    container.get<Core>(Core);
})();
