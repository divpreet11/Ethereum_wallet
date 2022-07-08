import { DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from './db';
import { ITradePayload } from '../modules/user/trades/trade.interface';

export const block_data = sequelize.define<ITradePayload>('block_details', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
   },
   hash: {
      type: DataTypes.STRING,
   },
   from: {
      type: DataTypes.STRING,
   },
   to: {
      type: DataTypes.STRING,
   },
   value: {
      type: DataTypes.STRING,
   },
   balance: {
      type: DataTypes.STRING,
   },
});
