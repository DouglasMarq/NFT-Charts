import { inject, injectable } from 'inversify';
import Request from '../utils/request';
import { URLS } from '../constants/constants';
import Debug from 'debug';
import { TokenPancake } from '../constants/interfaces';
const debug = Debug('service:core');

@injectable()
export default class Service {
    private readonly _request: Request;

    constructor(@inject(Request) request: Request) {
        this._request = request;
    }

    public async processToken(token: string) {
        const result: TokenPancake = (await this._request.get(`${URLS.pancakeURL}/${token}`)).data;
        return result;
    }
}
