import { Request, Response } from 'express';
import logger from '../utils/logger';
import { createFundraiser, getFundraisers, getFundraiserById } from '../service/fundraiser.service';

export async function createFundraiserHandler(req: Request, res: Response) {
  try {
    let fundraiser = await createFundraiser(req.body);
    return res.send(fundraiser);
  } catch (ex: any) {
    logger.error(ex);
    res.status(400).send(ex.message);
  }
}

export async function getFundraisersHandler(req: Request, res: Response) {
  console.log('wrong route');
  try {
    let fundraisers = await getFundraisers();
    return res.send(fundraisers);
  } catch (ex: any) {
    logger.error(ex);
    res.status(400).send(ex.message);
  }
}

export async function getFundraiserByIdHandler(req: Request, res: Response) {
  let { id } = req.params;
  console.log(id);

  if (typeof id !== 'string') {
    res.status(500).send('Invalid ID');
  }

  try {
    let fundraiser = await getFundraiserById(id);
    return res.send(fundraiser);
  } catch (ex: any) {
    logger.error(ex);
    res.status(400).send(ex.message);
  }
}
