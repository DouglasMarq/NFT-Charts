import { injectable } from 'inversify';
import Debug from 'debug';
import TelegramBot from 'node-telegram-bot-api';
const debug = Debug('bot:events');

@injectable()
export default class Events {
    private readonly _bot: TelegramBot;

    constructor(bot: TelegramBot) {
        debug(`Initiating events`);
        this._bot = bot;
        this.createEvents();
    }

    private createEvents() {
        this._bot.on('message', (msg) => {
            if (!msg ||
                !msg.chat.id ||
                msg.from?.is_bot ||
                !msg.text) return;
            const chatId: number = msg.chat.id;

            this._bot.sendMessage(chatId, 'Received your message.');
        });
    }
}
