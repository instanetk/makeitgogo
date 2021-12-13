import { Box, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { FC } from 'react';
import { IProgressProps } from '../interfaces';

const Progress: FC<IProgressProps> = ({ currentAmount, goalAmount, contributions }) => {
  if (goalAmount === null) goalAmount = 0;
  const percent: number = (currentAmount / goalAmount) * 100;

  return (
    <>
      <Box sx={{ alignItems: 'center', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <Box sx={{ display: 'inline-flex' }}>
            <Typography
              variant="h2"
              fontWeight="bold"
              fontSize="1.5rem"
              color="#222"
              aria-label="amount raised by this campaign">
              ${currentAmount.toLocaleString('en-US')}
            </Typography>
            <Typography fontWeight="light" fontSize="1.3rem" ml={1}>
              USD
            </Typography>
          </Box>
          <Box>
            <Typography fontSize="1.2rem" ml={1}>
              {contributions && contributions.length} backers
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={percent} sx={{ height: '15px', borderRadius: '15px' }} />
        </Box>
        <Box sx={{ minWidth: 35, marginTop: '2px' }}>
          <Typography variant="body2" color="text.primary">
            {`${Math.round(percent)}%`} of ${goalAmount.toLocaleString('en-US')}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Progress;
