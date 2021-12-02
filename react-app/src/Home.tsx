import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import ImgMediaCard from './common/ImgMediaCard';
import { ICampaign } from './interfaces';
import { FundraiserContext } from './context/FundraiserContext';

const Home = () => {
  const [fundraisers, setFundraisers] = useState<ICampaign[] | null>([]);

  const data = useContext(FundraiserContext);

  useEffect(() => {
    setFundraisers(data);
  }, [data]);

  return (
    <Box mt={4}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {fundraisers &&
          // eslint-disable-next-line array-callback-return
          fundraisers.map((campaign: ICampaign) => {
            if (campaign.published)
              return (
                <Grid item key={campaign._id}>
                  <Link to={`/campaign/${campaign._id}`}>
                    <ImgMediaCard
                      title={campaign.title}
                      story={campaign.story}
                      currentAmount={campaign.current_amount}
                      goalAmount={campaign.goal_amount}
                    />
                  </Link>
                </Grid>
              );
          })}
      </Grid>
    </Box>
  );
};

export default Home;
