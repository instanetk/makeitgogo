import { UserInfo } from 'firebase/auth';

export interface ICampaign {
  title: string;
  story: string;
  image_url: string;
  category: string;
  goal_amount: number;
  current_amount: number;
  published?: boolean;
  owner: string;
  _id?: string;
  date?: Date;
  faves?: number;
}

export type IUser = UserInfo | null;
