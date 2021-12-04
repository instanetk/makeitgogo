import { Express, Request, Response } from 'express';
import validate from './middleware/validateResource';
import { createFundraiserSchema } from './schema/fundraiser.schema';
import {
  createFundraiserHandler,
  getFundraisersHandler,
  getFundraiserByIdHandler,
  postFavesHandler,
} from './controller/fundraiser.controller';
import { checkoutSessionHandler, createStripeUserAccountHandler } from './controller/stripe.controller';

function routes(app: Express) {
  app.get('/test', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/api/fundraiser', validate(createFundraiserSchema), createFundraiserHandler);

  app.get('/api/fundraiser', getFundraisersHandler);

  app.get('/api/fundraiser/campaign/:id', getFundraiserByIdHandler);

  app.post('/api/fundraiser/campaign/faves/:id', postFavesHandler);

  app.post('/api/stripe/create-checkout-session', checkoutSessionHandler);

  app.post('/api/stripe/create-user-account', createStripeUserAccountHandler);
}

export default routes;
