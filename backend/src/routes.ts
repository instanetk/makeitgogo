import { Express, Request, Response } from 'express';
import validate from './middleware/validateResource';
import { createFundraiserSchema } from './schema/fundraiser.schema';
import { createFundraiserHandler } from './controller/fundraiser.controller';

function routes(app: Express) {
  app.get('/test', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/api/fundraiser', validate(createFundraiserSchema), createFundraiserHandler);
}

export default routes;
