import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { MIDDLEWARE_RESPONSE } from '../constant/response';
import * as Helpers from '../helpers';
import { IRequestUser } from './jwt.middleware';

declare module 'express' {
   interface Request {
      userInfo: IRequestUser;
   }
}
const setResponse = Helpers.ResponseHelper;

// eslint-disable-next-line max-lines-per-function
function adminValidateToken(
   request: Request,
   response: Response,
   next: NextFunction
): Response | void {
   // const { redisUserTokenDb } = process.env;

   const token =
      request.body.accessToken ||
      request.query.accessToken ||
      request.headers['api-access-token'];

   jwt.verify(
      token,
      process.env.JWTSECRET,
      async (
         err: jwt.VerifyErrors,
         decoded: {
            email: string;
            adminId: string;
            role: string;
            accessRole: number;
         }
      ) => {
         if (err) {
            return setResponse.error(response, err.message);
         }
         try {
            if (
               +decoded.accessRole !== 0 &&
               +decoded.accessRole !== 1 &&
               +decoded.accessRole !== 2
            ) {
               return setResponse.error(
                  response,
                  MIDDLEWARE_RESPONSE.PERMISSION_DENIED
               );
            }
            const exist = await Helpers.RedisHelper.getString(
               'jwt_token_' + decoded.adminId
            );
            if (exist) {
               request.userInfo = {
                  jwtData: decoded.adminId,
                  email: decoded.email,
               };
               next();
            } else {
               return setResponse.error(response, MIDDLEWARE_RESPONSE.JWTERROR);
            }
         } catch (error) {
            return setResponse.error(response, MIDDLEWARE_RESPONSE.JWTERROR);
         }
      }
   );
}

export default adminValidateToken;
