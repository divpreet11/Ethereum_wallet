import { RESPONSES } from '../../constant/response';
import { Response } from 'express';

class ResponseHelper {
   public success<T = void>(response: Response, responseData: T) {
      return response.status(RESPONSES.SUCCESS).send(responseData || {});
   }

   public error<T = void>(response: Response, responseData: T) {
      return response.status(RESPONSES.BADREQUEST).send(responseData || {});
   }
   public custom<T = void>(
      statusCode: number,
      response: Response,
      responseData: T
   ) {
      return response.status(statusCode).send(responseData || {});
   }
}
export default new ResponseHelper();
