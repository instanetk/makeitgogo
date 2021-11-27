import NavBar from './common/NavBar';
import Home from './Home';
import Login from './Login';
import { ThemeProvider } from '@mui/system';
import { Container } from '@mui/material';
import theme from './assets/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
