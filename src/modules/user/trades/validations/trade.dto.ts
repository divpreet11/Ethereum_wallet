import { IsNotEmpty } from 'class-validator';

export default class TradeUserStatus {
   @IsNotEmpty()
   trade_id: string;

   @IsNotEmpty()
   status: number;
}
