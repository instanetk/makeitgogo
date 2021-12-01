import NavBar from './common/NavBar';
import Home from './Home';
import Login from './pages/login/LoginController';
import SignUp from './pages/signup/SignupController';
import Campaign from './pages/campaign/Campaign';
import Dashboard from './Dashboard';
import { ThemeProvider } from '@mui/system';
import { Container } from '@mui/material';
import theme from './assets/theme';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container fixed>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
