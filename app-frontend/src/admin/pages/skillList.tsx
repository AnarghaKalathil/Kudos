import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { getAllSkills, createSkill, deleteSkill } from '@/lib/adminApi';

const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchSkills = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllSkills();
      setSkills(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpen = () => {
    setFormData({ name: '' });
    setEditId(null);
    setOpen(true);
    setIsDeleteConfirm(false);
  };

  const handleEdit = (skill: any) => {
    setFormData({ name: skill.name });
    setEditId(skill.id);
    setOpen(true);
    setIsDeleteConfirm(false);
  };

  const handleDelete = (id: number) => {
    const skillToDelete = skills.find((s) => s.id === id);
    if (skillToDelete) {
      setFormData({ name: skillToDelete.name });
      setDeleteId(id);
      setIsDeleteConfirm(true);
      setOpen(true);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isDeleteConfirm && deleteId !== null) {
        await deleteSkill(deleteId);
        setSkills((prev) => prev.filter((s) => s.id !== deleteId));
      } else if (editId !== null) {
        alert('Edit API is not available');
      } else {
        const newSkill = await createSkill({ name: formData.name });
        setSkills((prev) => [...prev, newSkill]);
      }
      setOpen(false);
      setDeleteId(null);
      setIsDeleteConfirm(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const columns = [
    { key: 'name', label: 'Skill Name' },
    { key: 'created_at', label: 'Created At' },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5">Skills</Typography>

      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add Skill
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataTable
          columns={columns}
          rows={skills}
          // onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <FormModal
        open={open}
        handleClose={() => setOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        title={isDeleteConfirm ? 'Delete Confirmation' : editId ? 'Edit Skill' : 'Add Skill'}
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

export default SkillsPage;
