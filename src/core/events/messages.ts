import { injectable, inject } from 'inversify';
import Debug from 'debug';
import TelegramBot from 'node-telegram-bot-api';
const debug = Debug('bot:messages');

@injectable()
export default class Messages {
    private readonly _bot: TelegramBot;

    constructor(@inject(TelegramBot) bot: TelegramBot) {
        debug(`Initiating messages events.`);
        this._bot = bot;
    }
}
