import { UserInfo } from 'firebase/auth';
import { Token } from '@stripe/stripe-js';

export interface ICampaign {
  _id?: string;
  title: string;
  story: string;
  image_url: string;
  category: string;
  goal_amount: number;
  current_amount: number;
  published?: boolean;
  owner: string;
  email: string | null;
  date?: Date;
  faves?: number;
  stripeId?: string;
  contributions?: [IContribution];
}

export interface IContribution {
  _id?: string;
  userId?: string;
  amount: number;
  fundraiserId: string;
  date?: Date;
}

export interface ITransaction {
  amount: number;
  fundraiserId: string;
  token: Token;
}

export interface ICampaignUpdate {
  title: string;
  story: string;
  image_url: string;
  category: string;
  goal_amount: number;
}

export type IUser = UserInfo | null;
