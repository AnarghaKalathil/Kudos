// src/pages/CategoriesPage.tsx

import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { Button } from '@/components/ui/button';
import { getAllCategories, createCategory, deleteCategory } from '@/lib/adminApi';
import Pagination from "@/components/Pagination";

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 15;

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      // Sort by id descending (most recent first)
      setCategories(data.sort((a, b) => b.id - a.id));
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
        setCategories((prev) => [newCategory, ...prev]);
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

  // Filter categories by search term
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedCategories = filteredCategories.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);
  const totalPages = Math.ceil(filteredCategories.length / entriesPerPage);

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between py-6 px-2">
        <h2 className="text-2xl font-bold text-foreground">Categories</h2>
        <Button onClick={handleOpen} className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition-transform">Add Category</Button>
      </div>
      <div className="flex flex-row items-center justify-end px-2 pb-2">
        <input
          type="text"
          placeholder="Search categories..."
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
            <DataTable columns={columns} rows={paginatedCategories} onDelete={handleDelete} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
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

