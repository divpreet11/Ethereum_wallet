import { config } from 'dotenv';
import { resolve } from 'path';

export function initiate(): Promise<boolean> {
   return new Promise((resolve1) => {
      /** */
      if (process.env.NODE_ENV === 'local') {
         console.log('::YOU ARE ON local MODE::');
         config({ path: resolve(__dirname, './local.env') });
      } else if (process.env.NODE_ENV === 'stage') {
         // config({ path: resolve(__dirname, './stage.env') });
         console.log('::YOU ARE ON stage MODE::');
      } else if (process.env.NODE_ENV === 'prod') {
         console.log('::YOU ARE ON prod MODE::');
      } else if (process.env.NODE_ENV === 'qa') {
         console.log('::YOU ARE ON qa MODE::');
      } else {
         config({ path: resolve(__dirname, './local.env') });
      }
      resolve1(true);
   });
}
