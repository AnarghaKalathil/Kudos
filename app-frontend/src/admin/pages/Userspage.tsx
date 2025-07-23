import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { Button } from '@/components/ui/button';
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
      } else {
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
    <div className="w-full">
      <div className="flex flex-row items-center justify-between py-6 px-2">
        <h2 className="text-2xl font-bold text-foreground">Users</h2>
        <Button onClick={handleOpen} className="text-lg px-8 py-3 font-bold rounded-lg">Add User</Button>
      </div>
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center py-6 text-muted-foreground text-base">Loading...</div>
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
        {error && (
          <div className="text-red-600 text-sm text-center mt-2">{error}</div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;

