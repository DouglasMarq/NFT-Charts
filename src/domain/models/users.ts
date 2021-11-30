import { inject, injectable } from 'inversify';
import Database from '../../database';
import { UserAttributes } from '../../constants/interfaces';
import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { debug } from 'console';

@injectable()
export default class usersModel {
    private _userInstance: ModelCtor<UserAttributes>;
    private readonly _databaseConnection: Database;
    private readonly _sequelize: Sequelize;

    constructor(@inject(Database) databaseConnection: Database) {
        this._databaseConnection = databaseConnection;
        this._sequelize = databaseConnection.getDatabaseConnection;
        this._sequelize.query(`CREATE TABLE IF NOT EXISTS users`);
        this._userInstance = this._sequelize.define<UserAttributes>(`users`,
            {
                id: {
                    primaryKey: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                },
                userId: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    unique: true,
                },
                chatId: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    unique: true,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
        );

        this._userInstance.create({
            userId: 1,
            chatId: 1,
            firstName: `John Doe`,
        }).then(async (res) => {
            debug(`RESULT::::: ${res}`);
            const findAll = await this._userInstance.findAll();
            debug(`FINDALL::::: ${findAll}`);
        });
    }

    get UserModel() {
        return this._userInstance;
    }
}
