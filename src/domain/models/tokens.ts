import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize/dist';
import Database from '../../database';

@injectable()
export default class tokensModel {
    private readonly _databaseConnection: Sequelize;

    constructor(@inject(Database) databaseConnection: Database) {
        this._databaseConnection = databaseConnection.getDatabaseConnection;
    }
}
