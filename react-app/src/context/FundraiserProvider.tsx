import { useEffect, useState, useCallback, FC } from 'react';
import { FundraiserContext } from './FundraiserContext';
import { getFundraisers, Campaign } from '../services/fundraiserService';

export const FundraiserProvider: FC = ({ children }) => {
  const [fundraisers, setFundraisers] = useState<Campaign[] | null>(null);

  const fetchData = useCallback(async () => {
    let { data } = await getFundraisers();
    setFundraisers(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <FundraiserContext.Provider value={fundraisers}>{children}</FundraiserContext.Provider>;
};
