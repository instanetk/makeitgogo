import { FC } from 'react';
import { ReactComponent as UFO } from './assets/svg/ufo.svg';
import { Box, Typography } from '@mui/material';

const NotFound: FC = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: 'auto',
        }}>
        <Box sx={{ width: '350px', height: 'auto', margin: '40px 0' }}>
          <UFO />
        </Box>
        <Typography variant="h1" fontSize={'2.5rem'}>
          Page Not Found
        </Typography>
      </Box>
    </>
  );
};

export default NotFound;
