import { Request, Response } from 'express';
import logger from '../utils/logger';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function checkoutSessionHandler(req: Request, res: Response) {
  try {
    const session = await stripe.checkout.sessions.create({
      type: 'express',
      mode: 'payment',
      success_url: `${process.env.ROOT_DOMAIN}/success`,
      cancel_url: `${process.env.ROOT_DOMAIN}/cancel`,
    });

    res.redirect(303, session.url);
  } catch (ex: any) {
    logger.error(ex.message);
    res.status(400).send(ex.message);
  }
}

export async function createStripeUserAccountHandler(req: Request, res: Response) {
  const user = req.body;
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    res.send(account);
  } catch (ex: any) {
    logger.error(ex.message);
    res.status(400).send(ex.message);
  }
}
