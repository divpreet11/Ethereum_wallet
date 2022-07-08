//import OrderBookHelper from '../../modules/user/orderbook/orderbook.helper';
class SocketHelper {
   public io: NodeJS.Socket;

   constructor(io: NodeJS.Socket) {
      this.io = io;
      this.checkConnection();
   }

   checkConnection(): void {
      this.io.on('connection', () => {
         // OrderBookHelper.sendInitialSocket().then(() => {
         //    console.log('-----------');
         // });
         //console.log('Socket connected successfully');
      });
   }
}

export default SocketHelper;
