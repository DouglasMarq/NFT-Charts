import 'reflect-metadata';
import { Container } from 'inversify';
import Core from '../core';

const container = new Container();

export default function bindContainers() {
    container.bind<Core>(Core).to(Core).inSingletonScope();

    return container;
}
