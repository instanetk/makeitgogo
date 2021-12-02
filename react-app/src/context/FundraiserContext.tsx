import { createContext } from 'react';
import { ICampaign } from '../interfaces';

export const FundraiserContext = createContext<ICampaign[] | null>(null);
