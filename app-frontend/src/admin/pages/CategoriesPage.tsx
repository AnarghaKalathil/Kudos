import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState([
    { id: 1, categoryName: 'Mentoring', updatedTime: '2025-07-20' },
    { id: 2, categoryName: 'Leadership', updatedTime: '2025-07-19' },
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ categoryName: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleOpen = () => {
    setFormData({ categoryName: '' });
    setEditId(null);
    setOpen(true);
  };

  const handleEdit = (category: any) => {
    setFormData(category);
    setEditId(category.id);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    const categoryToDelete = categories.find((c) => c.id === id);
    if (categoryToDelete) {
      setFormData(categoryToDelete);
      setDeleteId(id);
      setIsDeleteConfirm(true);
      setOpen(true);
    }
  };

  const handleSubmit = () => {
    const updatedTime = new Date().toISOString().split('T')[0];
    if (isDeleteConfirm && deleteId !== null) {
      setCategories(categories.filter((u) => u.id !== deleteId));
    } else if (editId !== null) {
      setCategories(categories.map((u) => (u.id === editId ? { ...formData, id: editId , updatedTime} : u)));
    } else {
      setCategories([...categories, { ...formData, id: Date.now(), updatedTime }]);
    }
    setOpen(false);
    setDeleteId(null);
    setIsDeleteConfirm(false);
  };

  const columns = [
    { key: 'categoryName', label: 'Category Name' },
    { key: 'updatedTime', label: 'Last Updated' },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5">Categories</Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add Category
      </Button>

      <DataTable
        columns={columns}
        rows={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        open={open}
        handleClose={() => setOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        title={ isDeleteConfirm ? 'Delete Confirmation' :editId ? 'Edit Category' : 'Add Category'}
        isDeleteConfirm={isDeleteConfirm}

      />
    </Box>
  );
};

export default CategoriesPage;