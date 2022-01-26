import 'reflect-metadata';
import 'jest-extended';
import { Container } from 'inversify';
import Core from '../index';
import bindContainer from '../../bin/container';
import dotenv from 'dotenv';
dotenv.config();

describe('Core test cases', () => {
    let context: Container;
    let bot: Core;

    beforeAll(() => {
        process.env.token = `5053478707:AAG2yBcvuYzGoXo3cR71feHvJNYOVIa4s-k`;
        context = bindContainer();

        bot = context.get<Core>(Core);
    });

    it('Should check if bot is successfuly instantiated', () => {
        expect(bot).toBeObject();
        expect(bot).toBeInstanceOf(Core);
        expect(bot._bot).not.toBeNil();
    });

    it(`Should not instantiate a class if token is invalid`, () => {
        process.env.token = ``;

        bot = context.get<Core>(Core);

        expect(bot._bot).toBeNil();
    });

    it(`Should not instantiate a class if token is missing`, () => {
        process.env.token = null;

        bot = context.get<Core>(Core);

        expect(bot._bot).toBeNil();
    });

    afterEach(() => {
        if (bot?._bot) {
            bot._bot.stopPolling();
            bot._bot.close();
        }
        bot._bot = null;
    });
});
