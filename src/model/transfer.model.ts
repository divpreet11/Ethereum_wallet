import { DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from './db';
import { ITradePayload } from '../modules/user/trades/trade.interface';

//**********************Definition Of Model*************************//

export const make_transfer = sequelize.define<ITradePayload>('transactions', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
   },
   user_id: {
      type: DataTypes.STRING,
   },
   // from_address: {
   //    type: DataTypes.STRING,
   // },
   // to_address: {
   //    type: DataTypes.STRING,
   // },
   // transfer: {
   //    type: DataTypes.NUMBER,
   // },
});
