import { FC, useCallback, useEffect, useState } from 'react';
import { useTitle } from '../../common/Hooks';
import { useParams } from 'react-router-dom';
import CampaignView from './CampaignView';
import { ICampaign } from '../../interfaces';
import { getFundraiseById, postFaves } from '../../services/fundraiserService';
import { AxiosResponse } from 'axios';

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

  const { id } = useParams<string>();

  const fetchData = useCallback(async () => {
    try {
      if (id !== undefined) {
        let { data } = await getFundraiseById(id);
        setCampaign(data);
      }
    } catch (ex: any) {
      console.log(ex.message);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const giveFaves = async (id: string) => {
    await postFaves(id);
    fetchData();
  };

  useTitle(campaign.title);

  return <CampaignView campaign={campaign} giveFaves={giveFaves} />;
};

export default CampaignController;
