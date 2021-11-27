import ImgMediaCard from './common/Card';
import { Box, Grid } from '@mui/material';

const Home = () => {
  return (
    <Box mt={4}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item>
          <ImgMediaCard />
        </Grid>
        <Grid item>
          <ImgMediaCard />
        </Grid>
        <Grid item>
          <ImgMediaCard />
        </Grid>
        <Grid item>
          <ImgMediaCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
