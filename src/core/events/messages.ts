import { injectable, inject } from 'inversify';
import TelegramBot from 'node-telegram-bot-api';
import Debug from 'debug';
import Service from '../../service';
const debug = Debug('bot:messages');

const events = {
    helpOrStart: (msg: TelegramBot.Message, bot: TelegramBot) => {
        if (!msg ||
            !msg.chat.id ||
            msg.from?.is_bot ||
            !msg.text) return;
        debug(`/start received from ${msg.chat.username}`);
        const chatId: number = msg.chat.id;

        bot.sendMessage(chatId, `Hello there, ${msg.chat.first_name !== undefined ? msg.chat.first_name : ''}!
        Available commands are:
        !help,
        !setToken [token],
        !deleteToken [token],
        !listTokens,
        !deleteAllTokens`);
    },
    contractOrToken: async (msg: TelegramBot.Message, bot: TelegramBot, service: Service) => {
        if (!msg) return;
        if ( msg &&
            !msg.chat.id ||
            msg.from?.is_bot ||
            !msg.text) return;

        const contract: string = msg.text.split(' ')[1];
        if (!contract) {
            bot.sendMessage(msg.chat.id,
                'Invalid contract/token, please try again with the correct format.',
                {
                    reply_to_message_id: msg.message_id,
                });
        }

        debug(await service.processToken(contract));
    },
};

@injectable()
export default class Messages {
    private readonly _bot: TelegramBot;
    private readonly _service: Service;

    // TODO - Didn`t liked this implementation, change to prototype.bind() later!
    constructor(@inject(TelegramBot) bot: TelegramBot,
    @inject(Service) service: Service) {
        debug(`Initiating messages events.`);
        this._bot = bot;
        this._service = service;
        this._bot.onText(/^\!help|\/start/i, (msg) => events.helpOrStart(msg, bot));
        this._bot.onText(/^\!setToken|\!setContract/i, (msg) => events.contractOrToken(
            msg,
            bot,
            service));
    }
}
