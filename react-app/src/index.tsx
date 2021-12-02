import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { FundraiserProvider } from './context/FundraiserProvider';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <FundraiserProvider>
          <App />
        </FundraiserProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
