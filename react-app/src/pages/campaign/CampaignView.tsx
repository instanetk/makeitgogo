import { FC } from 'react';
import { Grid, Box, Typography, Card, CardMedia, Button, Avatar } from '@mui/material';
import Progress from '../../common/Progress';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import bookshelf from '../../assets/images/bookshelf.png';
import { ICampaign } from '../../interfaces';

const CampaignView: FC<ICampaign> = (campaign) => {
  return (
    <>
      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} md={7}>
          <Box>
            <Card>
              <CardMedia component="img" alt={campaign.title} height="400" image={bookshelf} />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <Box>
              <Typography color="text.secondary" fontSize="1rem" gutterBottom>
                FUNDING / ART / 87 FAVES
              </Typography>
              <Typography variant="h1" fontWeight="bold" fontSize="2rem" color="#222" gutterBottom>
                {campaign.title}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
              <Avatar sx={{ bgcolor: 'primary' }} alt="David Quintero" src="/broken-image.jpg" />
              <Box ml={2}>
                <Typography fontWeight="bold" fontSize="1.1rem">
                  David Quintero
                </Typography>
                <Typography>Orlando, FL</Typography>
              </Box>
            </Box>
            <Box sx={{ margin: '15px 0' }}>
              <Progress currentAmount={campaign.current_amount} goalAmount={campaign.goal_amount} backers={90} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="info" sx={{ height: '3.4rem', width: '48%', fontSize: '1.5rem' }}>
                Back It
              </Button>
              <Button variant="outlined" color="primary" sx={{ height: '3.4rem', width: '48%', fontSize: '1.5rem' }}>
                <FavoriteBorderOutlinedIcon sx={{ mr: '5px' }} /> Fav It
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} md={7}>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.400' }}>
            <Typography color="grey.700" fontSize="1.2rem">
              STORY
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography color="text.primary">{campaign.story}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.400' }}>
            <Typography color="grey.700" fontSize="1.2rem">
              CONTRIBUTIONS
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }} mt={2}>
            <Avatar sx={{ bgcolor: 'primary' }} alt="Miranda Otto" src="/broken-image.jpg" />
            <Box ml={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography fontWeight="bold" fontSize="1.1rem">
                Miranda Otto
              </Typography>
              <Typography fontSize="1.1rem" ml={1}>
                $86
              </Typography>
            </Box>
          </Box>
          <Box mt={2}>
            <Typography color="text.primary"></Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CampaignView;
