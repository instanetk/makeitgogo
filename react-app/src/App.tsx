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
import EditCampaignController from './pages/edit/EditCampaignController';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import Footer from './common/Footer';
import './App.css';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  let user = useContext(AuthContext);

  let stripePublishableKey: string = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string;
  const stripePromise = loadStripe(stripePublishableKey);

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container fixed>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/campaign/:id" element={<CampaignController />} />
            <Route
              path="/campaign/create"
              element={
                <PrivateRoute user={user}>
                  <CreateCampaignController />
                </PrivateRoute>
              }
            />
            <Route
              path="/campaign/edit/:id"
              element={
                <PrivateRoute user={user}>
                  <EditCampaignController />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Elements>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
