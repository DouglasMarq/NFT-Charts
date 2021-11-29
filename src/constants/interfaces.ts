import { Model } from 'sequelize/dist';

export interface UserAttributes extends Model {
    id: number;
    chatId: number;
    userId: number;
    firstName: string;
}

export interface TokenAttributes extends Model {

}
