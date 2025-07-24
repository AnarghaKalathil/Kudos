import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAllSkills, createSkill, deleteSkill } from '@/lib/adminApi';
import Pagination from "@/components/Pagination";

const SkillsPage: React.FC = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 15;

  // Filter skills by search term
  const filteredSkills = skills.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedSkills = filteredSkills.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);
  const totalPages = Math.ceil(filteredSkills.length / entriesPerPage);

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
        toast({
          title: 'Skill added successfully!',
          variant: 'default',
        });
      }
      setOpen(false);
      setDeleteId(null);
      setIsDeleteConfirm(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmitWithCheck = async () => {
    if (skills.some(s => (s.name || '').toLowerCase() === (formData.name || '').toLowerCase())) {
      setError('A skill with that name already exists.');
      return;
    }
    setError(null);
    await handleSubmit();
  };

  const columns = [
    { key: 'name', label: 'Skills' },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between py-6 px-2">
        <h2 className="text-2xl font-bold text-foreground">Skills</h2>
        <Button onClick={handleOpen} className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition-transform">Add Skill</Button>
      </div>
      <div className="flex flex-row items-center justify-end px-2 pb-2">
        <input
          type="text"
          placeholder="Search skills..."
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
            <DataTable columns={columns} rows={paginatedSkills} onDelete={handleDelete} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
        <FormModal
          open={open}
          handleClose={() => { setOpen(false); setError(null); }}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmitWithCheck}
          title={isDeleteConfirm ? 'Delete Confirmation' : editId ? 'Edit Skill' : 'Add Skill'}
          isDeleteConfirm={isDeleteConfirm}
          error={error}
        />
        {error && (
          <div className="text-red-600 text-sm text-center mt-2">{error}</div>
        )}
      </div>
    </div>
  );
};

export default SkillsPage;
