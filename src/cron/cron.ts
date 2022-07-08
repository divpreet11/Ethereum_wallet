import * as cron from 'cron';
import create_account from '../modules/user/trades/trade.helper';
import TradeHelper from '../modules/user/trades/trade.helper';
const { CronJob } = cron;
class CronService {
   constructor() {
      console.log('cron service running...');
      this.wallet();
   }

   public wallet() {
      new CronJob(
         '*/2 * * * * *',
         async () => {
            //await TradeHelper.create_account();
         },
         null,
         true,
         'America/Los_Angeles'
      );
   }
}
export default new CronService();
