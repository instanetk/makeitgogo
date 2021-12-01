import { Box, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { FC } from 'react';

interface IProps {
  percent: number;
  progress: number;
  currentAmount: number;
  goalAmount: number;
  backers: number;
}

const Progress: FC<IProps> = ({ percent, progress, currentAmount, goalAmount, backers }) => {
  return (
    <>
      <Box sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <Box sx={{ display: 'inline-flex' }}>
            <Typography variant="h2" fontWeight="bold" fontSize="1.5rem" color="#222">
              ${currentAmount}
            </Typography>
            <Typography fontWeight="light" fontSize="1.3rem" ml={1}>
              USD
            </Typography>
          </Box>
          <Box>
            <Typography fontSize="1.2rem" ml={1}>
              {backers} backers
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} sx={{ height: '15px', borderRadius: '15px' }} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.primary">
            {`${Math.round(percent)}%`} of {goalAmount}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Progress;
