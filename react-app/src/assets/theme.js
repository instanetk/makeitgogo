import { createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';

const primaryColor = purple[700];
const secondaryColor = purple[900];

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      main: '#009688',
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
