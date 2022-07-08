import Controller from './controller.interface';
import RequestWithUser from './user/requestWithUser.interface';

export { Controller, RequestWithUser };

export interface IRequestResponse<T = void> {
   error: boolean;
   message: string;
   data?: T;
}
