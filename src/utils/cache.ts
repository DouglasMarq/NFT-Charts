import { injectable } from 'inversify';
import { isPast } from 'date-fns';
import { CacheType } from '../constants/types';

@injectable()
export default class Cache {
    private cache: Map<string, CacheType>;

    constructor() {
        this.cache = new Map<string, CacheType>();
    }

    getFromCache(contract: string) {

    }

    addToCache(itemToCache: CacheType) {

    }

    private removeFromCache(contract: string) {
        if (this.cache.size < 1 || !this.cache.has(contract)) return;

    }

    private itsValid(contract: string) {
        if (!this.cache.has(contract)) return;

        const contractObject = this.cache.;
    }
}
