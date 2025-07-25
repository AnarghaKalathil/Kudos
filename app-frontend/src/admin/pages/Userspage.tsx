import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAllUsers, createUser, deleteUser } from '@/lib/adminApi';
import Pagination from "@/components/Pagination";

const UsersPage: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    designation: string;
  }>({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    designation: ''
  });
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 15;

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      // Sort by id descending (most recent first)
      setUsers(data.sort((a, b) => b.id - a.id));
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
      designation: ''
    });
    setOpen(true);
    setIsDeleteConfirm(false);
  };

  const handleDelete = (id: number) => {
    const userToDelete = users.find((u) => u.id === id);
    if (userToDelete) {
      const { department, ...rest } = userToDelete;
      setFormData({ ...rest, password: '' });
      setDeleteId(id);
      setIsDeleteConfirm(true);
      setOpen(true);
    }
  };

  const handleSubmit = async () => {
    // Frontend check: prevent duplicate email
    if (!isDeleteConfirm && users.some(u => (u.email || '').toLowerCase() === (formData.email || '').toLowerCase())) {
      setError('A user with that email already exists.');
      return;
    }
    try {
      if (isDeleteConfirm && deleteId !== null) {
        await deleteUser(deleteId);
        setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      } else {
        const newUser = await createUser(formData);
        setUsers((prev) => [newUser, ...prev]);
        toast({
          title: 'User added successfully!',
          variant: 'default',
        });
      }
      setOpen(false);
      setDeleteId(null);
      setIsDeleteConfirm(false);
    } catch (err: any) {
      // Show all error messages as a string, not [object Object]
      let errorMsg = '';
      if (err && err.response && err.response.message) {
        const msgObj = err.response.message;
        if (typeof msgObj === 'object' && msgObj !== null) {
          errorMsg = Object.values(msgObj)
            .map((v) => Array.isArray(v) ? v.join(' ') : v)
            .join(' ');
        } else if (typeof msgObj === 'string') {
          errorMsg = msgObj;
        }
      }
      setError(errorMsg || err.message || 'An error occurred.');
    }
  };

  const columns = [
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'designation', label: 'Designation' }
  ];

  // Filter users by search term
  const filteredUsers = users.filter(
    (u) =>
      (u.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.first_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.last_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.designation || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between py-6 px-2">
        <h2 className="text-2xl font-bold text-foreground">Users</h2>
        <Button onClick={handleOpen} className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition-transform">Add User</Button>
      </div>
      <div className="flex flex-row items-center justify-end px-2 pb-2">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 px-4 py-2 border rounded-lg w-full max-w-xs"
        />
      </div>
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center py-6 text-muted-foreground text-base">Loading...</div>
        ) : (
          <>
            <DataTable columns={columns} rows={paginatedUsers} onDelete={handleDelete} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
        <FormModal
          open={open}
          handleClose={() => { setOpen(false); setError(null); }}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          title={isDeleteConfirm ? 'Delete Confirmation' : 'Add User'}
          isDeleteConfirm={isDeleteConfirm}
          error={error}
        />
      </div>
    </div>
  );
};

export default UsersPage;

