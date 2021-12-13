import { UserInfo } from 'firebase/auth';
import { Token } from '@stripe/stripe-js';
import { SelectChangeEvent } from '@mui/material';
import { FormEvent } from 'react';

export type IUser = UserInfo | null;
export interface ICampaign {
  _id?: string;
  title: string;
  story: string;
  image_url: string;
  category: string;
  goal_amount: number | null;
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
  goal_amount: number | null;
}
export interface ICampaignViewProps {
  campaign: ICampaign;
  giveFaves: (id: string) => Promise<void>;
  owner: boolean;
  modal: {
    open: boolean;
    handleClose: () => void;
    fetchData: () => Promise<void>;
  };
}

export interface ICreateCampaignProps {
  handleSubmit: (event: any) => Promise<void>;
  textEditor: string;
  handleTextEditor: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  setFile: (e: any) => Promise<void>;
  imgUrl: string;
  category: string;
  handleCategory: (event: SelectChangeEvent<unknown>) => void;
  handleAmount: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  goalAmount: number | null;
  buttonLoading: boolean;
}

export interface IEditCampaignProps {
  campaign: ICampaign;
  handleTitle: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  title: string;
  handleSubmit: (event: any) => Promise<void>;
  textEditor: string;
  handleTextEditor: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  setFile: (e: any) => Promise<void>;
  imgUrl: string;
  category: string;
  handleCategory: (event: SelectChangeEvent<unknown>) => void;
  handleAmount: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  goalAmount: number | null;
  buttonLoading: boolean;
  handleDelete: (event: any) => Promise<void>;
}

export interface IPaymentModalProps {
  open: boolean;
  handleClose: () => void;
  campaign: ICampaign;
  fetchData: () => Promise<void>;
}

export interface IProgressProps {
  currentAmount: number;
  goalAmount: number | null;
  contributions: [IContribution] | undefined;
}

export interface IMediaCardProps {
  title: string;
  story: string;
  image: string;
  currentAmount: number;
  goalAmount: number | null;
  contributions: [IContribution] | undefined;
}

export interface ILoginProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  error: string;
}

export interface ISignUpProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  error: string;
  loading: boolean;
}
