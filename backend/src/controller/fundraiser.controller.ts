import { Request, Response } from 'express';
import logger from '../utils/logger';
import { createFundraiser, getFundraisers, getFundraiserById, postFaves } from '../service/fundraiser.service';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function createFundraiserHandler(req: Request, res: Response) {
  // consider implementing 2 Phased Transactions

  let stripeAccount;

  // First create user account on Stripe to store ID on our Fundraiser document
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: req.body.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    stripeAccount = account;
  } catch (ex: any) {
    logger.error(ex.message);
    res.status(400).send(ex.message);
  }

  // Destructure client request object to set stripeId

  const stripeFundraiser = { ...req.body, stripeId: stripeAccount.id };

  // Create our Fundraiser
  try {
    let fundraiser = await createFundraiser(stripeFundraiser);
    return res.send(fundraiser);
  } catch (ex: any) {
    logger.error(ex);
    res.status(400).send(ex.message);
  }
}

export async function getFundraisersHandler(req: Request, res: Response) {
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

  try {
    let fundraiser = await getFundraiserById(id);
    return res.send(fundraiser);
  } catch (ex: any) {
    logger.error(ex);
    res.status(400).send(ex.message);
  }
}

export async function postFavesHandler(req: Request, res: Response) {
  let { id } = req.params;

  try {
    let fundraiser = await postFaves(id);
    return res.send(fundraiser);
  } catch (ex: any) {
    logger.error(ex);
    res.status(400).send(ex.messages);
  }
}
