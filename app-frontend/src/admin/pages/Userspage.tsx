import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Akshaya', email: 'akshaya+1@terrificminds.com', designation: 'Magento Developer' },
    { id: 2, name: 'Akhila', email: 'akhila+1@terrificminds.com', designation: 'Shopify Developer' },
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password:'', designation: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleOpen = () => {
    setFormData({ name: '', email: '',password:'', designation: '' });
    setEditId(null);
    setOpen(true);
    setIsDeleteConfirm(false);
  };

  const handleEdit = (user: any) => {
    setFormData(user);
    setEditId(user.id);
    setOpen(true);
    setIsDeleteConfirm(false);
  };

  const handleDelete = (id: number) => {
    const userToDelete = users.find((u) => u.id === id);
    if (userToDelete) {
      setFormData({ ...userToDelete, password: '' });
      setDeleteId(id);
      setIsDeleteConfirm(true);
      setOpen(true);
    }
  };
  const handleSubmit = () => {
    if (isDeleteConfirm && deleteId !== null) {
      setUsers(users.filter((u) => u.id !== deleteId));
    } else if (editId !== null) {
      setUsers(users.map((u) => (u.id === editId ? { ...formData, id: editId } : u)));
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setOpen(false);
    setDeleteId(null);
    setIsDeleteConfirm(false);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'designation', label: 'Designation' },
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
        title={isDeleteConfirm ? 'Delete Confirmation' : editId ? 'Edit User' : 'Add User'}
        isDeleteConfirm={isDeleteConfirm}
      />
    </Box>
  );
};

export default UsersPage;