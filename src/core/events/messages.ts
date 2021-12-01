import { injectable, inject } from 'inversify';
import TelegramBot from 'node-telegram-bot-api';
import Service from '../../service';
import { ContractAttributes, ContractPancake } from '../../constants/interfaces';
import Debug from 'debug';
const debug = Debug('bot:messages');

@injectable()
export default class Messages {
    private readonly events = {
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
            !token [contract]`);
        },
        contractOrToken: async (msg: TelegramBot.Message, bot: TelegramBot) => {
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

            let contractResult: ContractPancake;
            try {
                contractResult = await this._service.processContract(contract);
            } catch (ex) {
                bot.sendMessage(msg.chat.id,e
                    `Couldn't find this token, please try again.`,
                    {
                        reply_to_message_id: msg.message_id,
                    });

                return;
            }

            const message = `Here's the result for your contract:
            ${contractResult.data.name} contract was updated at: ${contractResult.updated_at}
            Name: ${contractResult.data.name}
            Symbol: ${contractResult.data.symbol}
            Coin Price: ${contractResult.data.price}
            Coin Price in BNB: ${contractResult.data.price_BNB}`;
            bot.sendMessage(msg.chat.id, message, {
                reply_to_message_id: msg.message_id,
            });

            return;
        },
        registerContractOrToken: async (msg: TelegramBot.Message,
            bot: TelegramBot,
            service: Service) => {
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

            const contractResult: ContractPancake = await service.processContract(contract);
            const message = `Here's the result for your contract:
            ${contractResult.data.name} contract was updated at: ${contractResult.updated_at}
            Name: ${contractResult.data.name}
            Symbol: ${contractResult.data.symbol}
            Coin Price: ${contractResult.data.price}
            Coin Price in BNB: ${contractResult.data.price_BNB},
            Are these information correct?`;
            bot.sendMessage(msg.chat.id, message, {
                reply_markup: {
                    keyboard: [[{ text: 'No' }], [{ text: 'Yes' }]],
                },
            });
            this._waitingForCommand = true;
            this._contractCommand = contract;
        },
        /* TODO -> Refactor this one, maybe make the message protected? So we
        ** don`t repeat it multiple times.
        */
        getContractOrToken: async (msg: TelegramBot.Message,
            bot: TelegramBot) => {
            if (!msg) return;
            if ( msg &&
                !msg.chat.id ||
                msg.from?.is_bot ||
                !msg.text) return;

            const nameResult: string = msg.text.split(' ')[1];
            if (!nameResult) {
                bot.sendMessage(msg.chat.id,
                    'Invalid name, please try again with the correct format.',
                    {
                        reply_to_message_id: msg.message_id,
                    });
            }

            const sqlResult: ContractAttributes | null | undefined = await this.getContractSql(nameResult);
            if (!sqlResult) return;
            const contractResult: ContractPancake | undefined = await this.getContractPancake(sqlResult.contract);
            if (!contractResult) return;
            const message = `Here's the result for your contract:
            ${contractResult.data.name} contract was updated at: ${contractResult.updated_at}
            Name: ${contractResult.data.name}
            Symbol: ${contractResult.data.symbol}
            Coin Price: ${contractResult.data.price}
            Coin Price in BNB: ${contractResult.data.price_BNB}`;
            bot.sendMessage(msg.chat.id, message, {
                reply_to_message_id: msg.message_id,
            });
        },
        processYesResponse: async (msg: TelegramBot.Message,
            bot: TelegramBot) => {
            if (!this._waitingForCommand) return;
            if (!msg) return;
            if (msg.text?.toLowerCase() !== 'yes') return;
            if (msg &&
                !msg.chat.id ||
                msg.from?.is_bot ||
                !msg.text) return;

            this._waitingForCommand = false;

            this.processYesResponse();

            bot.sendMessage(msg.chat.id,
                `Done. You may now search for !contract [name]`, {
                    reply_to_message_id: msg.message_id,
                });
        },
    };
    private readonly _bot: TelegramBot;
    private readonly _service: Service;
    private _waitingForCommand: boolean = false;
    private _contractCommand: string = '';

    // TODO - Didn`t liked this implementation, change to prototype.bind() later!
    constructor(@inject(TelegramBot) bot: TelegramBot,
    @inject(Service) service: Service) {
        debug(`Initiating messages events.`);
        this._bot = bot;
        this._service = service;
        this._bot.onText(/^\!help|\/start/i, (msg) => this.events.helpOrStart(msg, bot));
        this._bot.onText(/^\!token|\!contract/i, (msg) => this.events.contractOrToken(
            msg,
            bot));

        // TODO -> Refactor those events.
        // this._bot.onText(/^\!addToken|\!addContract|\!registerToken|\!registerContract/i, (msg) => this.events.registerContractOrToken(
        //     msg,
        //     bot,
        //     service));
        // this._bot.onText(/^\!contract|\!token/i, (msg) => this.events.getContractOrToken(
        //     msg,
        //     bot));
        // this._bot.on('message', (msg) => this.events.processYesResponse(
        //     msg,
        //     bot));
    }

    private processYesResponse() {
        if (this._contractCommand === '') return;
        this._service.saveContractToDatabase(this._contractCommand);
        this._contractCommand = '';
    }

    private async getContractSql(contract: string) {
        if (!contract) return;
        return await this._service.getContractFromDatabase(contract);
    }

    private async getContractPancake(contract: string) {
        if (!contract) return;
        return await this._service.processContract(contract);
    }
}
