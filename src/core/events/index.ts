import { inject, injectable } from 'inversify';
import TelegramBot from 'node-telegram-bot-api';
import Messages from './messages';
import Debug from 'debug';
const debug = Debug('bot:events');
@injectable()
export default class Events {
    private readonly _bot: TelegramBot;
    private readonly _messages: Messages;

    constructor(@inject(TelegramBot) bot: TelegramBot, @inject(Messages) message: Messages) {
        debug(`Initiating events`);
        this._bot = bot;
        this._messages = message;
        this.createEvents();
    }

    private createEvents() {
        this._bot.on('message', (msg) => {
            debug(`Message received.s`);
            if (!msg ||
                !msg.chat.id ||
                msg.from?.is_bot ||
                !msg.text) return;
            const chatId: number = msg.chat.id;

            this._bot.sendMessage(chatId, 'Received your message.');
        });
    }
}
