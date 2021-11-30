import { Request, Response } from 'express';
import logger from '../utils/logger';
import { createFundraiser } from '../service/fundraiser.service';

export async function createFundraiserHandler(req: Request, res: Response) {
  try {
    let fundraiser = await createFundraiser(req.body);
    return res.send(fundraiser);
  } catch (ex: any) {
    logger.error(ex);
    res.status(400).send(ex.message);
  }
}
