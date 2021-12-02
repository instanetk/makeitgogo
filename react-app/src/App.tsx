import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import { Container } from '@mui/material';
import theme from './assets/theme';
import NavBar from './common/NavBar';
import Home from './Home';
import Login from './pages/login/LoginController';
import SignUp from './pages/signup/SignupController';
import CampaignController from './pages/campaign/CampaignController';
import CreateCampaignController from './pages/create/CreateCampaignController';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import Footer from './common/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container fixed>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/campaign/:id" element={<CampaignController />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateCampaignController />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
