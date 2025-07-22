import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { getAllUsers, createUser, deleteUser } from '@/lib/adminApi';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    designation: '',
    department: ''
  });
  // const [editId, setEditId] = useState<number | null>(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      designation: '',
      department: ''
    });
    // setEditId(null);
    setOpen(true);
    setIsDeleteConfirm(false);
  };

  const handleEdit = (user: any) => {
    setFormData({ ...user, password: '' });
    // setEditId(user.id);
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

  const handleSubmit = async () => {
    try {
      if (isDeleteConfirm && deleteId !== null) {
        await deleteUser(deleteId);
        setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      } 
      // else if (editId !== null) {
      //   alert('Edit is not implemented in backend yet.');
      // } 
      else {
        const newUser = await createUser(formData);
        setUsers((prev) => [...prev, newUser]);
      }
      setOpen(false);
      setDeleteId(null);
      setIsDeleteConfirm(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const columns = [
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'designation', label: 'Designation' },
    { key: 'department', label: 'Department' }
  ];

  return (
    <Box p={3}>
      <Typography variant="h5">Users</Typography>

      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add User
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataTable columns={columns} rows={users} onDelete={handleDelete} />
      )}

      <FormModal
        open={open}
        handleClose={() => setOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        title={isDeleteConfirm ? 'Delete Confirmation' : 'Add User'}
        isDeleteConfirm={isDeleteConfirm}
      />

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsersPage;
