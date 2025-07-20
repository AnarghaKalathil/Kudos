import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6">Kudos Admin Panel</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;