import { injectable } from 'inversify';
import axios, { Axios } from 'axios';

@injectable()
export default class Request {
    private axios: Axios;

    constructor() {
        this.axios = axios;
    }

    public async get(url: string) {
        return await this.axios.get(url);
    }
}
