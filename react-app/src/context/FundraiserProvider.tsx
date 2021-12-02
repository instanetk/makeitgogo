import { useEffect, useState, useCallback, FC } from 'react';
import { FundraiserContext } from './FundraiserContext';
import { getFundraisers } from '../services/fundraiserService';
import { ICampaign } from '../interfaces';

export const FundraiserProvider: FC = ({ children }) => {
  const [fundraisers, setFundraisers] = useState<ICampaign[] | null>(null);

  const fetchData = useCallback(async () => {
    try {
      let { data } = await getFundraisers();
      setFundraisers(data);
    } catch (ex: any) {
      console.log(ex.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <FundraiserContext.Provider value={fundraisers}>{children}</FundraiserContext.Provider>;
};
