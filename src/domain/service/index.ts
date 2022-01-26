import { inject, injectable } from 'inversify';
import Request from '../../utils/request';
import { URLS } from '../../constants/constants';
import { ContractPancake } from '../../constants/interfaces';
import ContractsModel from '../model/contracts';
import Debug from 'debug';
const debug = Debug('service:core');


// TODO - Organizar `Contracts` no respectivo arquivo
@injectable()
export default class Service {
    private readonly _request: Request;
    private readonly _contractsModel: ContractsModel;

    constructor(@inject(Request) request: Request,
                @inject(ContractsModel) contractsModel: ContractsModel) {
        this._request = request;
        this._contractsModel = contractsModel;
    }

    public async processContract(contract: string) {
        const result: ContractPancake = await (await this._request.get(`${URLS.pancakeURL}/${contract}`)).data;
        result.updated_at = new Date(result.updated_at).toLocaleString();
        return result;
    }

    public async saveContractToDatabase(contract: string) {
        const result: ContractPancake = (await this._request.get(`${URLS.pancakeURL}/${contract}`)).data;
        if (!result) return;
        await this._contractsModel.ContractModel.create({
            contract: contract,
            name: result.data.name,
            symbol: result.data.symbol,
        });
        return result;
    }

    public async getContractFromDatabase(contract: string) {
        return await this._contractsModel.ContractModel.findOne({
            where: { name: contract },
        });
    }
}
