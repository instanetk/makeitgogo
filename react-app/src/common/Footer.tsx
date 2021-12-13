import { Box, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
        backgroundColor: '#eee',
      }}>
      <Typography>
        See code on <Link href="https://github.com/instanetk/makeitgogo">GitHub</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
