// import { RedisClientType, createClient } from 'redis';
// import { REDIS_HOST } from '../constant/env.config';

// const Web3 = require('web3');
// const web3 = new Web3(
//    'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
// );

// class RedisService {
//    client!: RedisClientType;
//    constructor() {
//       this.connect();
//    }
//    async connect() {
//       if (!this.client) {
//          const client = createClient({ url: REDIS_HOST });
//          await client.connect();
//          console.log('Redis client connected.');

//          this.client = client as RedisClientType;
//       }
//    }

//    async getString(key: string) {
//       if (!this.client) {
//          await this.connect();
//       }
//       return await this.client.get(key);
//    }

//    async setString(key: string, value: number) {
//       if (!this.client) {
//          await this.connect();
//       }
//       return this.client.set(key, value);
//    }
// }
// export default new RedisService();
