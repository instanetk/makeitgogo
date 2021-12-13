import { AppBar, Box, Toolbar, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { ReactComponent as MakeItGoGo } from '../assets/svg/MakeItGoGo.svg';

const NavBar = () => {
  let user = useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} aria-label="Navigation bar">
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
          <Box sx={{ flexGrow: 1 }} aria-label="logo: make it go go. links to the home page.">
            <Link to="/">
              <MakeItGoGo style={{ width: '175px', height: 'auto', marginTop: '20px' }} />
            </Link>
          </Box>
          <Link to="/campaign/create">
            <Button color="inherit">Create Campaign</Button>
          </Link>
          {user ? (
            <>
              <Button color="inherit" onClick={handleLogOut}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" href="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
