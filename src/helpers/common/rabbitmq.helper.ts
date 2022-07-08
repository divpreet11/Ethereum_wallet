import * as amqp from 'amqplib/callback_api';
import { RABITMQ } from '../../constant/response';

class RabbitMq {
   public channel: amqp.Channel;

   constructor() {
      console.log(
         'Rabbit mq working here for credential',
         process.env.RabbitMq
      );
      //  this.startServer();
   }

   public async startServer() {
      try {
         await this.connect()
            .then(
               (res: amqp.Channel) => {
                  this.channel = res;
                  console.log('Connection sucessfuly created');

                  res.assertQueue(RABITMQ.NEWOFFER, { durable: false });

                  this.channel.prefetch(1);
                  this.consumeOrderMatched();
               },
               (error) => {
                  console.log('Error of rabbit queue', error);
                  return error;
               }
            )
            .catch((err) => {
               console.log('The err of rb is ', err);
            });
      } catch (error) {
         console.log('Error of rb is ', error);
      }
   }

   public connect() {
      try {
         return new Promise((resolve, reject) => {
            amqp.connect(process.env.RabbitMq, (err, conn) => {
               if (err) {
                  console.log('the rabbit error', err);
                  reject(err);
               }
               conn?.createChannel((eror, ch) => {
                  if (eror) {
                     console.log('the error is ', eror);
                     reject(eror);
                  }
                  resolve(ch);
               });
            });
         });
      } catch (error) {
         console.log('error while connecting rabbit', error);
      }
   }

   public assertQueue(queue: string) {
      this.channel.assertQueue(queue, { durable: false });
   }

   public consumeQueue(queue: string) {
      return new Promise((resolve) => {
         this.channel.consume(
            queue,
            (msg: amqp.Message) => {
               const data = JSON.parse(msg.content.toString());
               this.channel.ack(msg);
               resolve(data);
            },
            { noAck: false }
         );
      });
   }

   public consumeOrderMatched() {
      this.channel.consume(
         RABITMQ.NEWOFFER,
         (msg: amqp.Message) => {
            //  const data = JSON.parse(msg.content.toString());
            this.channel.ack(msg);
            //Here your logic
         },
         { noAck: false }
      );
   }

   public createQueue(queue: string, data: string) {
      try {
         this.channel.sendToQueue(queue, Buffer.from(data));
      } catch (error) {
         console.log('rabbit create queue error is ', error);
      }
   }
}
export default new RabbitMq();
