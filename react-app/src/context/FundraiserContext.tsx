import { createContext } from 'react';
import { Campaign } from '../services/fundraiserService';

export const FundraiserContext = createContext<Campaign[] | null>(null);
