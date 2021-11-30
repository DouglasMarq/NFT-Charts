import { Model } from 'sequelize/dist';

export interface UserAttributes extends Model {
    id: number;
    chatId: number;
    userId: number;
    firstName: string;
}

export interface TokenAttributes extends Model {

}

export interface TokenPancake {
       updated_at: number,
       data: {
         name: string,
         symbol: string,
         price: string,
         price_BNB: string
       }
}
