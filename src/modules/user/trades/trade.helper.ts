import { IRequestResponse } from '@interfaces';
import { RES_MSG } from '../../../constant/response';
import BaseModel from '../../../model/base.model';
import { my_account } from '../../../model/trade.model';
import { make_transfer } from '../../../model/transfer.model';
import Web3 from 'web3';
import { ITradePayload } from './trade.interface';
import { block_data } from '../../../model/transaction.model';
import { Account } from 'aws-sdk';
import { Wallet } from 'ethers';
import { AddressContext } from 'twilio/lib/rest/api/v2010/account/address';
import { resourceLimits } from 'worker_threads';
import { LOADIPHLPAPI } from 'dns';
import RedisService from '../../../helpers/common/redis.helper';
import { text } from 'body-parser';

const bip39 = require('bip39');

const http = require('http');
const Web3HttpProvider = require('web3-providers-http');

let web3 = process.env.RPC;
const url = new Web3(web3);

class TradeHelper extends BaseModel {
   constructor() {
      super('');
   }

   /**
    * This method is responsible for handling various trade status
    * @param user_id
    * @param trade_id
    * @param status
    * @param pay_method
    */

   async block_details1(): Promise<IRequestResponse<void>> {
      try {
         const addressDetail = (await my_account.findAll({ raw: true })) as any;

         for (const wallet of addressDetail) {
            // const detail = await this.saveTransaction(wallet.address);
         }

         return { error: false, message: RES_MSG.ORDER_BOOK.SUCCESS };
      } catch (err) {
         console.log('Error under trade status ', err);
         return { error: true, message: err };
      }
   }
   async block_details(): Promise<IRequestResponse> {
      try {
         let block_details1 = await url.eth.getBlock(12542613);

         if (block_details1 != null && block_details1.transactions != null) {
            for (let txHash of block_details1.transactions) {
               let tx = await url.eth.getTransaction(txHash);
               if (tx.to) {
                  const dataByAddress = await my_account.findOne({
                     where: { address: tx.to },
                     raw: true,
                  });
                  // var ethBalance = '';

                  url.eth.getBalance(tx.to).then(async (weiBalance) => {
                     const ethBalance = url.utils.fromWei(weiBalance, 'ether');
                     if (dataByAddress) {
                        const data = {
                           hash: tx.hash,
                           from: tx.from,
                           to: tx.to,
                           value: tx.value,
                           balance: ethBalance,
                        };
                        console.log(
                           data,
                           'data::::::::::::::::::::::::::::::::'
                        );

                        const transaction_details = await block_data.create(
                           data,
                           {
                              raw: true,
                           }
                        );
                        console.log(
                           transaction_details,
                           'transaction_detailstransaction_details'
                        );
                     }
                  });
               }
            }
            return { error: false, message: RES_MSG.ORDER_BOOK.SUCCESS };
         }
      } catch (err) {
         console.log('Error under trade status ', err);
         return { error: true, message: err };
      }
   }
   async create_account(): Promise<IRequestResponse<void>> {
      try {
         //***** */

         // let transaction_details = {} as any;
         // let tx;
         // const latest_BlockNo = await url.eth.getBlockNumber();
         // console.log('latest Block Number: ', latest_BlockNo);

         // //redis

         // const blockNo =
         //    (await RedisService.getString('current_block')) || latest_BlockNo;
         // if (+blockNo <= latest_BlockNo) {
         //    await RedisService.setString('current_block', `${+blockNo - 50}`);
         // }
         // console.log('Current Block: ', latest_BlockNo);
         // console.log(blockNo, 'the value of block number');

         // //redis

         // //generate mnemonic keys
         // const key1 = bip39.generateMnemonic();
         // console.log('Mnemonic key-1: ', key1);

         // // let key2 = bip39.generateMnemonic();
         // // console.log('Mnemonic key-2: ', key2);

         // // let key3 = bip39.generateMnemonic();
         // // console.log('Mnemonic key-3: ', key3);

         const Account_data = url.eth.accounts.create();
         console.log('Account Data: ', Account_data);
         const account_balance = await url.eth.getBalance(Account_data.address);

         const result = await my_account.create(
            {
               Address: Account_data.address,
               Private_Key: Account_data.privateKey,
               balance: account_balance,
            },
            { raw: true }
         );

         //***** */

         return { error: false, message: RES_MSG.ORDER_BOOK.SUCCESS };
      } catch (err) {
         console.log('Error under trade status ', err);
         return { error: true, message: err };
      }
   }

   async get_account(
      address: string
   ): Promise<IRequestResponse<ITradePayload>> {
      try {
         const account = await my_account.findOne({
            where: { address: address },
            raw: true,
         });
         if (!account) throw 'Account does not exist';

         console.log(account, '************');
         return {
            error: false,
            message: RES_MSG.ORDER_BOOK.SUCCESS,
            data: account,
         };
      } catch (err) {
         console.log('Error under trade status ', err);
         return { error: true, message: err };
      }
   }

   async transaction(
      updated_user_id: any
   ): Promise<IRequestResponse<ITradePayload>> {
      try {
         console.log(updated_user_id.user_id, 'bnm,');

         const transaction_table = await make_transfer.create(
            {
               user_id: updated_user_id.user_id,
            },
            { raw: true }
         );
         console.log(transaction_table, 'account details');

         const address_no = updated_user_id.user_id;

         const transaction_detail = await url.eth.getTransaction(
            '0xc8fe2ceac93ad50e496b497357ae5385192dd28d'
         );

         //method-1
         //console.log(Buffer.from(JSON.stringify(transaction_detail)));

         //method-2
         // console.log(transaction_detail.toString(), 'method-2');

         //console.log(transaction_detail.toString());

         //const buf = Buffer.from(transaction_detail, 'utf8');

         console.log(transaction_detail.toString());

         return {
            error: false,
            message: RES_MSG.ORDER_BOOK.SUCCESS,
         };
      } catch (err) {
         console.log('Error under trade status ', err);
         return { error: true, message: err };
      }
   }
}

export default new TradeHelper();
