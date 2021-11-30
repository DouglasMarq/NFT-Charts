import TelegramBot from 'node-telegram-bot-api';
import { injectable, inject } from 'inversify';
import Events from './events';
import Debug from 'debug';
const debug = Debug('bot:core');

@injectable()
export default class Core {
    private _bot: TelegramBot;
    private readonly _events: Events;

    constructor(@inject(TelegramBot) bot: TelegramBot,
                @inject(Events) events: Events) {
        debug(`Starting bot core`);
        this._bot = bot;
        this._events = events;
    }
}
