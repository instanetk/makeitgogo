import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const primaryColor = {
  light: '#af52bf',
  main: '#9c27b0',
  dark: '#6d1b7b',
};
const secondaryColor = {
  light: '#83e345',
  main: '#64dd17',
  dark: '#469a10',
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      light: primaryColor.light,
      main: primaryColor.main,
      dark: primaryColor.dark,
    },
    secondary: {
      light: secondaryColor.light,
      main: secondaryColor.main,
      dark: secondaryColor.dark,
    },
    text: {
      primary: grey[900],
      secondary: primaryColor.dark,
    },
    action: {
      active: '#001E3C',
    },
    success: {
      main: secondaryColor.dark,
    },
    info: {
      main: '#e91e63',
    },
  },
  components: {
    AppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: primaryColor,
        },
      },
    },
  },
});

export default theme;
