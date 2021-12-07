import 'reflect-metadata';
import { Container } from 'inversify';
import Core from '..';
import bindContainer from '../../bin/container';
import dotenv from 'dotenv';
dotenv.config();

describe('Core test cases', () => {
    let context: Container;
    let bot: Core;

    beforeAll(() => {
        process.env.NODE_ENV = `test`;
        process.env.token = `token here`;
        context = bindContainer();

        bot = context.get<Core>(Core);
    });

    it('Should check if class is instantiated', () => {
        expect(bot).toBe(typeof Core);
    });
});
