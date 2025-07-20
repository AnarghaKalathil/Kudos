import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const Layout: React.FC = () => {
  return (
    <Box display="flex" height="100vh" >
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column" ml="240px">
        <Header />
        <Box p={3} flex={1} overflow="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;