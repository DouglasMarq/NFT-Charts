import { inject, injectable } from 'inversify';
import Database from '../../database';
import { ContractAttributes } from '../../constants/interfaces';
import { DataTypes, ModelCtor, Sequelize } from 'sequelize';

@injectable()
export default class ContractsModel {
    private _contractInstance: ModelCtor<ContractAttributes>;
    private readonly _databaseConnection: Database;
    private readonly _sequelize: Sequelize;

    constructor(@inject(Database) databaseConnection: Database) {
        this._databaseConnection = databaseConnection;
        this._sequelize = databaseConnection.getDatabaseConnection;
        this._contractInstance = this._sequelize.define<ContractAttributes>(`contracts`,
            {
                contract: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                symbol: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
            },
        );
    }

    get ContractModel() {
        return this._contractInstance;
    }
}
