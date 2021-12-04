import { Request, Response } from 'express';
import logger from '../utils/logger';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { processContribution } from '../service/contribution.service';
import Fundraiser from '../models/fundraiser.model';

export async function processContributionHandler(req: Request, res: Response) {
  //process stripe charge in pennies
  try {
    let contribution = await processContribution(req.body);

    // insert object into Fundraiser contribution = backers.length
    let fundraiser = await Fundraiser.findById(req.body.fundraiserId);

    fundraiser.contributions.push(contribution);
    // update Fundraiser current_amount total
    fundraiser.current_amount = fundraiser.current_amount + contribution.amount;

    fundraiser.save();

    return res.send(contribution);
  } catch (ex: any) {
    logger.error(ex);
    res.status(400).send(ex.message);
  }
}
