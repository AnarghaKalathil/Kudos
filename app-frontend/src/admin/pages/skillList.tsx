import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';

const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState([
    { id: 1, skillName: 'React', updatedTime: '2025-07-19' },
    { id: 2, skillName: 'TypeScript', updatedTime: '2025-07-18' },
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ skillName: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleOpen = () => {
    setFormData({ skillName: '' });
    setEditId(null);
    setOpen(true);
    setIsDeleteConfirm(false);
  };

  const handleEdit = (skill: any) => {
    setFormData(skill);
    setEditId(skill.id);
    setOpen(true);
    setIsDeleteConfirm(false);
  };

  const handleDelete = (id: number) => {
    const skillToDelete = skills.find((s) => s.id === id);
    if (skillToDelete) {
      setFormData(skillToDelete);
      setDeleteId(id);
      setIsDeleteConfirm(true);
      setOpen(true);
    }
  };

  const handleSubmit = () => {
    const updatedTime = new Date().toISOString().split('T')[0];
    if (isDeleteConfirm && deleteId !== null) {
      setSkills(skills.filter((u) => u.id !== deleteId));
    } else if (editId !== null) {
      setSkills(skills.map((u) => (u.id === editId ? { ...formData, id: editId, updatedTime } : u)));
    } else {
      setSkills([...skills, { ...formData, id: Date.now(), updatedTime }]);
    }
    setOpen(false);
    setDeleteId(null);
    setIsDeleteConfirm(false);
  };

  const columns = [
    { key: 'skillName', label: 'Skill Name' },
    { key: 'updatedTime', label: 'Last Updated' },
  ];

  return (
    <Box p={4}>
      {/* Centered Project Name */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight={700} color="primary">
          Kudos
        </Typography>
      </Box>

      {/* Skills Table Section */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight={600}>
            Skills
          </Typography>
          <Button variant="contained" onClick={handleOpen}>
            Add Skill
          </Button>
        </Stack>

        <DataTable
          columns={columns}
          rows={skills}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      <FormModal
        open={open}
        handleClose={() => setOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        title={isDeleteConfirm ? 'Delete Confirmation' : editId ? 'Edit Skill' : 'Add Skill'}
        isDeleteConfirm={isDeleteConfirm}
      />
    </Box>
  );
};

export default SkillsPage;
