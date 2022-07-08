import { OfferInterface } from '../../modules/user/offer/offer.interface';
import { Request } from 'express';

interface RequestWithUser extends Request {
   user: OfferInterface;
}

export default RequestWithUser;
