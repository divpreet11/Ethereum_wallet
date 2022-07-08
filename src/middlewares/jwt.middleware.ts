import { NextFunction, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import { MIDDLEWARE_RESPONSE, RESPONSES } from '../constant/response';
import { RedisHelper } from '../helpers';

export interface IRequestUser {
   jwtData?: string;
   jwtToken?: string;
   email?: string;
}

declare module 'express' {
   interface Request {
      userInfo: IRequestUser;
      jwtToken: string;
   }
}

function validateToken(
   request: Request,
   response: Response,
   next: NextFunction
): void {
   const token =
      request.body.accessToken ||
      request.query.accessToken ||
      request.headers['api-access-token'];

   jwt.verify(
      token,
      process.env.JWTSECRET,
      async (err: jwt.VerifyErrors, decoded: { jwtData: string }) => {
         if (err) {
            return response.status(RESPONSES.UN_AUTHORIZED).send(err.message);
         }
         try {
            const exist = await RedisHelper.getString(
               'jwt_token_' + decoded.jwtData
            );

            console.log(token, decoded);

            // check if token exist or not
            if (exist !== null) {
               request.userInfo = { jwtData: decoded.jwtData, jwtToken: token };
               next();
            } else {
               return response
                  .status(RESPONSES.UN_AUTHORIZED)
                  .send(MIDDLEWARE_RESPONSE.JWTERROR);
            }
         } catch (error) {
            console.log('Jwt error', error);
            return response
               .status(RESPONSES.UN_AUTHORIZED)
               .send(MIDDLEWARE_RESPONSE.JWTERROR);
         }
      }
   );
}

export default validateToken;
