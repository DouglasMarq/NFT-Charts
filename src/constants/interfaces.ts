import { Model } from 'sequelize/dist';

export interface UserAttributes extends Model {
    id: number;
    chatId: number;
    userId: number;
    firstName: string;
}

export interface TokenAttributes extends Model {

}

export interface ContractAttributes extends Model {
    contract: string;
    name: string;
    symbol: string;
}

export interface ContractPancake {
       updated_at: string,
       data: {
         name: string,
         symbol: string,
         price: string,
         price_BNB: string
       }
}
