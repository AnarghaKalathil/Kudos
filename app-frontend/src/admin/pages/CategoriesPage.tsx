// src/pages/CategoriesPage.tsx

import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { Button } from '@/components/ui/button';
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
    <div className="w-full">
      <div className="flex flex-row items-center justify-between py-6 px-2">
        <h2 className="text-2xl font-bold text-foreground">Categories</h2>
        <Button onClick={handleOpen} className="text-lg px-8 py-3 font-bold rounded-lg">Add Category</Button>
      </div>
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center py-6 text-muted-foreground text-base">Loading...</div>
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
        {error && (
          <div className="text-red-600 text-sm text-center mt-2">{error}</div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;

