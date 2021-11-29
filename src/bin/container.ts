import 'reflect-metadata';
import { Container } from 'inversify';
import Core from '../core';
import Messages from '../core/events/messages';
import Events from '../core/events';
import TelegramBot from 'node-telegram-bot-api';
import config from 'config';
import Database from '../database';
import tokensModel from '../domain/models/tokens';
import usersModel from '../domain/models/users';

const container = new Container();

export default function bindContainers() {
    container.bind<TelegramBot>(TelegramBot).toConstantValue(
        new TelegramBot(
            config.get('secrets.token'),
            {
                polling: true,
            }));
    container.bind<Core>(Core).to(Core).inSingletonScope();
    container.bind<Messages>(Messages).to(Messages).inSingletonScope();
    container.bind<Events>(Events).to(Events).inSingletonScope();

    // Database & Database Models
    container.bind<Database>(Database).to(Database).inSingletonScope();
    container.bind<tokensModel>(tokensModel).toConstantValue(
        new tokensModel(container.get<Database>(Database),
        ));
    container.bind<usersModel>(usersModel).toConstantValue(new usersModel(
        container.get<Database>(Database),
    ));

    return container;
}
