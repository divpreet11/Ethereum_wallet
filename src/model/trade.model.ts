import { DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from './db';
import { ITradePayload } from '../modules/user/trades/trade.interface';

//**********************Definition Of Model*************************//

export const my_account = sequelize.define<ITradePayload>('wallet', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
   },
   address: {
      type: DataTypes.STRING,
   },
   private__key: {
      type: DataTypes.STRING,
   },
   balance: {
      type: DataTypes.STRING,
   },
   // Data: {
   //    type: DataTypes.STRING,
   // },
});
