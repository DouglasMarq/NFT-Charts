import { injectable, inject } from 'inversify';
import Debug from 'debug';
import TelegramBot from 'node-telegram-bot-api';
const debug = Debug('bot:messages');

const events = {
    start: (msg: TelegramBot.Message, _bot: TelegramBot) => {
        if (!msg ||
            !msg.chat.id ||
            msg.from?.is_bot ||
            !msg.text) return;
        debug(`/start received from ${msg.chat.username}`);
        const chatId: number = msg.chat.id;

        _bot.sendMessage(chatId, `Hello there!
        Available commands are:
        !help, !setToken [contract]`);
    },
    help: (msg: TelegramBot.Message, _bot: TelegramBot) => {
        if (!msg ||
            !msg.chat.id ||
            msg.from?.is_bot ||
            !msg.text) return;
        debug(`/start received from ${msg.chat.username}`);
        const chatId: number = msg.chat.id;

        _bot.sendMessage(chatId, `Hello there!
        Available commands are:
        !help, !setToken [contract]`);
    },
};

@injectable()
export default class Messages {
    private readonly _bot: TelegramBot;

    // TODO - Didn`t liked this implementation, change to prototype.bind() later!
    constructor(@inject(TelegramBot) bot: TelegramBot) {
        debug(`Initiating messages events.`);
        this._bot = bot;
        this._bot.onText(/\/start/, (msg) => events.start(msg, this._bot));
        this._bot.onText(/\!help/, (msg) => events.help(msg, this._bot));
    }
}
