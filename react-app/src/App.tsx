import NavBar from './common/NavBar';
import Home from './Home';
import Login from './LoginController';
import SignUp from './SignupController';
import Dashboard from './Dashboard';
import { ThemeProvider } from '@mui/system';
import { Container } from '@mui/material';
import theme from './assets/theme';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
