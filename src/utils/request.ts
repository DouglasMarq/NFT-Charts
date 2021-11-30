import { injectable } from 'inversify';
import axios, { Axios } from 'axios';

@injectable()
export default class Request {
    private axios: Axios;

    constructor() {
        this.axios = axios;
    }

    public get(url: string) {
        return this.axios.get(url);
    }
}
