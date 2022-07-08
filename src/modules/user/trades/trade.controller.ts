import * as Interfaces from '@interfaces';
import * as express from 'express';
import * as Helpers from '../../../helpers';
import * as Middlewares from '../../../middlewares';
import TradeHelper from './trade.helper';
import TradeUserStatusDto from './validations/trade.dto';
const setResponse = Helpers.ResponseHelper;

class TradeController implements Interfaces.Controller {
   public path = '/user/trade';

   public router = express.Router();

   constructor() {
      this.initializeRoutes();
   }

   private initializeRoutes() {
      this.router
         // .all(`${this.path}/*`, Middlewares.jwtMiddleware)
         .get(
            `${this.path}/details`,
            // Middlewares.validationMiddleware(TradeUserStatusDto),
            this.block_details
         )
         .post(
            `${this.path}/status`,
            // Middlewares.validationMiddleware(TradeUserStatusDto),
            this.create_account
         )
         .post(
            `${this.path}/transaction`,
            // Middlewares.validationMiddleware(TradeUserStatusDto),
            this.transaction
         )

         .get(
            `${this.path}/read`,
            // Middlewares.validationMiddleware(TradeUserStatusDto),
            this.get_account
         );
   }

   private block_details = async (
      request: express.Request,
      response: express.Response
   ) => {
      //const { trade_id, status, pay_method } = request.body;
      // console.log(request.body, 'accounts');
      const res = await TradeHelper.block_details();
      if (res.error) {
         return setResponse.error(response, {
            message: res.message,
         });
      }
      return setResponse.success(response, {
         message: res.message,
      });
   };

   private create_account = async (
      request: express.Request,
      response: express.Response
   ) => {
      //const { trade_id, status, pay_method } = request.body;
      console.log(request.body, 'accounts');
      const res = await TradeHelper.create_account();
      if (res.error) {
         return setResponse.error(response, {
            message: res.message,
         });
      }
      return setResponse.success(response, {
         message: res.message,
      });
   };

   private get_account = async (
      request: express.Request,
      response: express.Response
   ) => {
      const address = <string>request.query.address;
      // const id = <string>(<unknown>request.query.id);
      console.log(address, 'account address');
      const result2 = await TradeHelper.get_account(address);
      if (result2.error) {
         return setResponse.error(response, {
            message: result2,
         });
      }
      return setResponse.success(response, {
         message: result2,
      });
   };

   // address as userid
   private transaction = async (
      request: express.Request,
      response: express.Response
   ) => {
      const { Address } = request.body;
      console.log(request.body, 'mmmmmmmmmmmm');

      //const user_id = <string>(<unknown>request.query.Address);
      //console.log(user_id, 'user_id of account fetched');

      const result2 = await TradeHelper.transaction(request.body);
      console.log(result2, 'resulttttttttt');

      if (result2.error) {
         return setResponse.error(response, {
            message: result2,
         });
      }
      return setResponse.success(response, {
         message: result2.message,
      });
   };
}

export default TradeController;
