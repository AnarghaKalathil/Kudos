import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import UsersPage from './pages/Userspage';
import CategoriesPage from './pages/CategoriesPage';
import AdminDashboard from './pages/AdminDashboard';
import SkillList from './pages/skillList';
import AddUserPage from './pages/addUser';
import EditUserPage from './pages/updateUser';

const AdminApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="skills" element={<SkillList />} />
        <Route path="adduser" element={<AddUserPage />} />
        <Route path="updateuser" element={<EditUserPage />} />

      </Route>
    </Routes>
  );
};

export default AdminApp;