import { Box, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100px',
        justifyContent: 'center',
        alignItems: 'center',
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
