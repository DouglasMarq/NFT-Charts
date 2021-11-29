import { injectable } from 'inversify';
import { Sequelize } from 'sequelize/dist';
import Debug from 'debug';
import config from 'config';
const debug = Debug('sql:core');

@injectable()
export default class Database {
    private readonly _connection: Sequelize;

    constructor() {
        debug(`Starting database connection at ${config.get(`database.instance`)}`);
        this._connection = new Sequelize(
            `${config.get(`database.dbname`)}`,
            `${config.get(`database.user`)}`,
            `${config.get(`database.pass`)}`,
            {
                dialect: 'mysql',
                host: `/cloudsql/${config.get(`database.instance`)}`,
                dialectOptions: {
                    socketPath: `/cloudsql/${config.get(`database.instance`)}`,
                },
            });
    }

    get getDatabaseConnection() {
        return this._connection;
    }
}
