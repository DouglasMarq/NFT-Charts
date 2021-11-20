import 'reflect-metadata';
import { Container } from 'inversify';
import Core from '../core';
import Messages from '../core/events/messages';

const container = new Container();

export default function bindContainers() {
    container.bind<Core>(Core).to(Core).inSingletonScope();
    container.bind<Messages>(Messages).to(Messages).inSingletonScope();

    return container;
}
