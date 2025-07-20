import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Akshaya', email: 'akshaya+1@terrificminds.com', role: 'Magento Developer' },
    { id: 2, name: 'Akhila', email: 'akhila+1@terrificminds.com', role: 'Shopify Developer' },
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleOpen = () => {
    setFormData({ name: '', email: '', role: '' });
    setEditId(null);
    setOpen(true);
  };

  const handleEdit = (user: any) => {
    setFormData(user);
    setEditId(user.id);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleSubmit = () => {
    if (editId) {
      setUsers(users.map((u) => (u.id === editId ? { ...formData, id: editId } : u)));
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5">Users</Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add User
      </Button>

      <DataTable
        columns={columns}
        rows={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        open={open}
        handleClose={() => setOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        title={editId ? 'Edit User' : 'Add User'}
      />
    </Box>
  );
};

export default UsersPage;