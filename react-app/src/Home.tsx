import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import ImgMediaCard from './common/ImgMediaCard';
import { ICampaign } from './interfaces';
import { getFundraisers } from './services/fundraiserService';

const Home = () => {
  const [fundraisers, setFundraisers] = useState<ICampaign[] | null>([]);

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

  return (
    <Box mt={4} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {fundraisers &&
          // eslint-disable-next-line array-callback-return
          fundraisers
            .map((campaign: ICampaign) => {
              if (campaign.published)
                return (
                  <Grid item key={campaign._id} aria-label="campaign card">
                    <Link to={`/campaign/${campaign._id}`}>
                      <ImgMediaCard
                        title={campaign.title}
                        story={campaign.story}
                        image={campaign.image_url}
                        currentAmount={campaign.current_amount}
                        goalAmount={campaign.goal_amount}
                        contributions={campaign.contributions}
                      />
                    </Link>
                  </Grid>
                );
              return null;
            })
            .reverse()}
      </Grid>
    </Box>
  );
};

export default Home;
