import ImgMediaCard from './common/ImgMediaCard';
import { Box, Grid } from '@mui/material';
import { Campaign } from './services/fundraiserService';
import { useEffect, useState } from 'react';
import { FundraiserContext } from './context/FundraiserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [fundraisers, setFundraisers] = useState<Campaign[] | null>([]);

  const data = useContext(FundraiserContext);

  useEffect(() => {
    setFundraisers(data);
  }, [data]);

  return (
    <Box mt={4}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {fundraisers &&
          (fundraisers as Array<Campaign>).map((campaign: Campaign) => {
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
