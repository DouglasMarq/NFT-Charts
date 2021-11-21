import TelegramBot from 'node-telegram-bot-api';
import { injectable, inject } from 'inversify';
import config from 'config';
import Debug from 'debug';
import Events from './events';
const debug = Debug('bot:core');

@injectable()
export default class Core {
    private _bot: TelegramBot;
    private readonly _events: Events;

    constructor(@inject(TelegramBot) bot: TelegramBot, @inject(Events) events: Events) {
        debug(`Starting bot core`);
        this._bot = bot;
        this._events = events;
        // this._events = new Events(this._bot);
    }

    public get GetCore() {
        return this._bot;
    }
}
