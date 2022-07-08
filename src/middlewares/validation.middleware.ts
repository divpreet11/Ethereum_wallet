import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import * as express from 'express';

function validationMiddleware(
   // eslint-disable-next-line
   type: any,
   skipMissingProperties = false
): express.RequestHandler {
   return (req, res, next) => {
      validate(plainToClass(type, req.body), { skipMissingProperties }).then(
         (errors: ValidationError[]) => {
            if (errors.length > 0) {
               const message = errors
                  .map((error: ValidationError) =>
                     Object.values(error.constraints)
                  )
                  .join(', ');
               res.status(422).json({ message });
            } else {
               next();
            }
         }
      );
   };
}

export default validationMiddleware;
