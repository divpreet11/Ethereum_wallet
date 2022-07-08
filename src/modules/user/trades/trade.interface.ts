import { integer } from 'aws-sdk/clients/cloudfront';
import { Model } from 'sequelize';

export interface ITradePayload extends Model {
   id: string;
   Address: string;
   Private_Key: string;
   balance: string;
}
// export interface ITradeReturn extends ITradePayload {
//    id?: number;
//    created_at?: string;
//    updated_at?: string;
// }
