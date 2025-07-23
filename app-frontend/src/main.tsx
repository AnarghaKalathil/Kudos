import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// TEMP: Store token manually for now (to bypass login)
localStorage.setItem(
  'token',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMjgxNDYzLCJpYXQiOjE3NTMyNzc4NjMsImp0aSI6IjFkMGUyMTBkMTViMTQzNjk4ODI3ZTQ1NGFlMzY3NTZiIiwidXNlcl9pZCI6MX0.77fZtnPajomebXmXZGZ8ZMv1d-4T91qdYHM4k8k0ta4'
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
