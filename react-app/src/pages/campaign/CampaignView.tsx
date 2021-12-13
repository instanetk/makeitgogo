import { FC } from 'react';
import { Grid, Box, Typography, Card, CardMedia, Button, Avatar } from '@mui/material';
import Progress from '../../common/Progress';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { ICampaignViewProps } from '../../interfaces';
import { Link } from 'react-router-dom';
import PaymentModal from './PaymentModal';

const CampaignView: FC<ICampaignViewProps> = ({ campaign, giveFaves, owner, modal }) => {
  return (
    <>
      <PaymentModal open={modal.open} handleClose={modal.handleClose} campaign={campaign} fetchData={modal.fetchData} />
      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} md={7}>
          <Box>
            <Card>
              <CardMedia component="img" alt={campaign.title} height="400" image={campaign.image_url} />
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary" fontSize="1rem" gutterBottom>
                  FUNDING / {campaign.category.toUpperCase()} / {campaign.faves} FAVES{' '}
                </Typography>
                <Typography color="text.primary" fontSize="1rem" gutterBottom>
                  {owner && <Link to={'/campaign/edit/' + campaign._id}>EDIT</Link>}
                </Typography>
              </Box>

              <Typography variant="h1" fontWeight="bold" fontSize="2rem" color="#222" gutterBottom>
                {campaign.title}
              </Typography>
            </Box>

            <Box sx={{ margin: '15px 0' }}>
              <Progress
                currentAmount={campaign.current_amount}
                goalAmount={campaign.goal_amount}
                contributions={campaign.contributions}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                aria-label="button to contribute to this campaign"
                variant="contained"
                color="info"
                sx={{ height: '3.4rem', width: '48%', fontSize: '1.5rem' }}
                onClick={modal.handleClose}>
                Back It
              </Button>
              <Button
                aria-label="button to fave this campaign"
                variant="outlined"
                color="primary"
                sx={{ height: '3.4rem', width: '48%', fontSize: '1.5rem' }}
                onClick={() => {
                  if (campaign._id !== undefined) giveFaves(campaign._id);
                }}>
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

          {campaign.contributions &&
            campaign.contributions
              .map((contribution) => {
                return (
                  <Box sx={{ display: 'flex', alignItems: 'center' }} mt={2} key={contribution._id}>
                    <Avatar sx={{ bgcolor: 'primary' }} alt="+" src="/broken-image.jpg" />
                    <Box ml={2} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography fontWeight="bold" fontSize="1.1rem">
                        ${contribution.amount && contribution.amount.toLocaleString('en-US')}
                      </Typography>
                      <Typography fontSize="1.1rem" ml={1}>
                        on{' '}
                        {contribution.date &&
                          new Date(contribution.date).toLocaleString('en-US', { timeZone: 'EST' }).toString()}
                      </Typography>
                    </Box>
                  </Box>
                );
              })
              .reverse()}

          <Box mt={2}>
            <Typography color="text.primary"></Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CampaignView;
