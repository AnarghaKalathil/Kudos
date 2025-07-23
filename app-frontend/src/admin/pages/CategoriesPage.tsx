// src/pages/CategoriesPage.tsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { getAllCategories, createCategory, deleteCategory } from '@/lib/adminApi';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpen = () => {
    setFormData({ name: '' });
    setOpen(true);
    setIsDeleteConfirm(false);
  };

  const handleDelete = (id: number) => {
    const category = categories.find((c) => c.id === id);
    if (category) {
      setFormData({ ...category });
      setDeleteId(id);
      setIsDeleteConfirm(true);
      setOpen(true);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isDeleteConfirm && deleteId !== null) {
        await deleteCategory(deleteId);
        setCategories((prev) => prev.filter((c) => c.id !== deleteId));
      } else {
        const newCategory = await createCategory(formData);
        setCategories((prev) => [...prev, newCategory]);
      }
      setOpen(false);
      setDeleteId(null);
      setIsDeleteConfirm(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const columns = [
    { key: 'name', label: 'Category Name' },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5">Categories</Typography>

      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add Category
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataTable columns={columns} rows={categories} onDelete={handleDelete} />
      )}

      <FormModal
        open={open}
        handleClose={() => setOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        title={isDeleteConfirm ? 'Delete Confirmation' : 'Add Category'}
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

export default CategoriesPage;

