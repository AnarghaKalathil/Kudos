// File: src/admin/pages/AdminDashboard.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const AdminDashboard: React.FC = () => {
  return (
    <Box p={3}>
      <Typography variant="h4">Welcome to the Admin Dashboard</Typography>
      <Typography variant="body1">Select a page from the sidebar to manage users, categories, or skills.</Typography>
    </Box>
  );
};

export default AdminDashboard;
