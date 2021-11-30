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
        this._userInstance = this._sequelize.define<UserAttributes>(`users`,
            {
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
                    defaultValue: 'John Doe',
                },
            },
        );
    }

    get UserModel() {
        return this._userInstance;
    }
}
