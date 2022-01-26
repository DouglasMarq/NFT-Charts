import { inject, injectable } from 'inversify';
import ContractsModel from '../model/contracts';
import Request from '../../utils/request';
import _Service from './index';

@injectable()
export default class Contracts extends _Service {
    constructor(
        @inject(Request) private readonly request: Request,
        @inject(ContractsModel) private readonly contractsModel: ContractsModel) {
        super(request, contractsModel);
    }
}
