import 'reflect-metadata';
import 'jest-extended';
import { Container } from 'inversify';
import Core from '..';
import bindContainer from '../../bin/container';
import dotenv from 'dotenv';
dotenv.config();

describe('Core test cases', () => {
    let context: Container;
    let bot: Core;

    beforeAll(() => {
        context = bindContainer();

        bot = context.get<Core>(Core);
    });

    it('Should check if class is instantiated', () => {
        expect(bot).not.toBeNull();
        expect(bot).toBeObject();
    });
});
