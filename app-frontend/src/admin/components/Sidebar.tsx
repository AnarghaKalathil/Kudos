// src/admin/components/Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Categories', path: '/admin/categories' },
    { name: 'Skills', path: '/admin/skills' },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{ sx: { width: 240, backgroundColor: '#f5f5f5' } }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            component={NavLink}
            to={item.path}
            sx={{
              '&.active': { backgroundColor: '#e0e0e0', fontWeight: 'bold' }
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
