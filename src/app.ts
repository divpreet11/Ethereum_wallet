import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import * as helmet from 'helmet';
import * as Helper from './helpers/index';
import { Controller } from './interfaces';
import * as swaggerDocument from './swagger.json';
import SocketHelper from './helpers/common/socket.heper';
import { Server } from 'http';
import UtilitiesHelper from './helpers/common/utilities.helper';
const mailHelper = Helper.MailHelper;

declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace NodeJS {
      interface Global {
         socket?: Socket;
      }
   }
}
const globalData = global;
class App {
   public app: express.Application;

   constructor(controllers: Controller[]) {
      // config.initiate();
      this.app = express.default();
      this.getProcessInfo();
      this.initializeMiddlewares();
      this.initializeControllers(controllers);
      // this.initializeErrorHandling();
   }

   public listen(): void {
      const instance: Server = this.app.listen(
         process.env.PORT ? process.env.PORT : 8082,
         async () => {
            console.log(
               `App listening on the port ${
                  process.env.PORT ? process.env.PORT : 8082
               }`
            );
            // await UtilitiesHelper.syncAll();
            this.socketConnect(instance);
         }
      );
   }

   public getServer(): express.Application {
      return this.app;
   }

   private initializeMiddlewares() {
      this.app.use(bodyParser.json());
      this.app.use(cookieParser.default());
      this.app.set('views', path.join(__dirname, 'views'));
      this.app.set('view engine', 'ejs');
      this.app.use(cors.default());
      this.app.use(
         '/ptp/swagger',
         swaggerUi.serve,
         swaggerUi.setup(swaggerDocument)
      );
      this.app.use(helmet.default());
   }

   private initializeControllers(controllers: Controller[]) {
      controllers.forEach((controller) => {
         this.app.use('/ptp', controller.router);
      });
      this.app.get('/ptp/status', (req, res) => {
         console.log('Status Route called');
         return res.json({ status: 'success' });
      });
   }

   private getProcessInfo() {
      this.app.use((req, res, next) => {
         mailHelper.appObject = res;
         next();
      });
   }

   private socketConnect(serverInstance: Server) {
      /*eslint-disable */
      const io: NodeJS.Socket = require('socket.io')(serverInstance, {
         cors: {
            origin: [
               'https://socket.io',
               'http://127.0.0.1:5500',
               'http://localhost:3000',
            ],
            credentials: true,
         },
         path: '/ptp-socket',
         allowEIO3: true,
      });

      globalData.socket = io;
      global = globalData;
      new SocketHelper(io);
   }
}
export default App;
