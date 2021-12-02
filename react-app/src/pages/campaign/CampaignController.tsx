import { FC, useContext, useEffect, useState } from 'react';
import { useTitle } from '../../common/Hooks';
import { useParams } from 'react-router-dom';
import { FundraiserContext } from '../../context/FundraiserContext';
import CampaignView from './CampaignView';
import { ICampaign } from '../../interfaces';

const CampaignController: FC = () => {
  const defaulState: ICampaign = {
    title: 'string;',
    story: 'string;',
    image_url: 'string;',
    category: 'string;',
    goal_amount: 1,
    current_amount: 0,
    published: false,
    owner: 'string;',
    _id: 'string;',
    date: new Date(),
  };

  const [campaign, setCampaign] = useState<ICampaign>(defaulState);

  const data = useContext<ICampaign[] | null>(FundraiserContext);
  const { id } = useParams<string>();
  useEffect(() => {
    if (data !== null) {
      const [campaign] = data.filter((obj) => obj._id === id);
      setCampaign(campaign);
    }
  }, [data, id]);

  useTitle(campaign.title);

  return <CampaignView {...campaign} />;
};

export default CampaignController;
