import TelegramBot from 'node-telegram-bot-api';
import { injectable } from 'inversify';
import config from 'config';
import Debug from 'debug';
import Events from './events';
const debug = Debug('bot:core');

@injectable()
export default class Core {
    private _bot: TelegramBot;
    private readonly _events: Events;

    constructor() {
        debug(`Starting bot core`);
        this._bot = this.initBotCore(config.get('secrets.token'), true);
        this._events = new Events(this._bot);
    }

    private initBotCore(token: string, polling: boolean = true) {
        debug(`instantiating bot core`);
        return new TelegramBot(token, { polling: polling });
    }

    public get GetCore() {
        if (!this._bot) return this._bot;
        return this.initBotCore(config.get('secrets.token'), true);
    }
}
