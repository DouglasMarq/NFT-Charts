import 'reflect-metadata';
import { Container } from 'inversify';
import Core from '../core';
import Messages from '../core/events/messages';
import Events from '../core/events';
import TelegramBot from 'node-telegram-bot-api';
import config from 'config';

const container = new Container();

export default function bindContainers() {
    container.bind<TelegramBot>(TelegramBot).toConstantValue(new TelegramBot(config.get('secrets.token'), { polling: true }));
    container.bind<Core>(Core).to(Core).inSingletonScope();
    container.bind<Messages>(Messages).to(Messages).inSingletonScope();
    container.bind<Events>(Events).to(Events).inSingletonScope();

    return container;
}
