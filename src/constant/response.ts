export const RESPONSES = {
   SUCCESS: 200,
   CREATED: 201,
   ACCEPTED: 202,
   NOCONTENT: 204,
   BADREQUEST: 400,
   UN_AUTHORIZED: 401,
   FORBIDDEN: 403,
   NOTFOUND: 404,
   TIMEOUT: 408,
   TOOMANYREQ: 429,
   INTERNALSERVER: 500,
   BADGATEWAYS: 502,
   SERVICEUNAVILABLE: 503,
   GATEWAYTIMEOUT: 504,
};

export const RABITMQ = {
   NEWOFFER: 'new_offer',
};

export const RES_MSG = {
   ORDER_BOOK: {
      SUCCESS: 'Data fethed successfully.',
      ERROR: 'Failed to feth data.',
   },
};

export const MIDDLEWARE_RESPONSE = {
   JWTERROR: 'Unauthorize Request',
   PERMISSION_DENIED: 'Permission denied for this user.',
   ONLY_LOGIN_WORKS: 'The feature is temporarily disabled.',
};

export const ENDPOINT = {};

export enum SOCKET_EVENTS {}

export const TWILIO_CONFIG = {
   accountSid: process.env.TWILIO_ACCOUNT_SID,
   apiKey: process.env.TWILIO_API_KEY,
   apiSecret: process.env.TWILIO_API_SECRET,
   chatServiceSid: process.env.TWILIO_CHAT_SERVICE_SID,
   pushCredentialSid: process.env.TWILIO_FCM_KEY,
};

export const EMAIL_TITLE = {};

export const SMALLEST_UNITS = 1000000000;
