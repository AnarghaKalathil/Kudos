import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// TEMP: Store token manually for now (to bypass login)
localStorage.setItem(
  'token',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMTk3NTc4LCJpYXQiOjE3NTMxOTM5NzgsImp0aSI6IjUwNmIyNDg4ZjhmZTQ0NTVhMmNkYTYyN2U0MzU0MTk5IiwidXNlcl9pZCI6MX0.aL8k-Z2W5PW8zY5QofrC9WH27o2cSNhNpFQr-m5k67c'
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
