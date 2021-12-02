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
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 10,
        width: '100%',
        height: '300px',
      },
      editor: {
        borderBottom: '0px solid gray',
      },
      editorContainer: {
        border: '1px solid #d5d5d5',
        width: '96%',
        height: '250px',
        padding: '1rem',
        overflow: 'auto',
      },
    },
  },
});

export default theme;
