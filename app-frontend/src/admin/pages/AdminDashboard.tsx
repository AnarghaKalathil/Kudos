// File: src/admin/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Layers, ListChecks, TrendingUp } from 'lucide-react';
import { getAllUsers, getAllCategories, getAllSkills } from '@/lib/adminApi';

const AdminDashboard: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  // You can add more analytics as needed

  useEffect(() => {
    getAllUsers().then(data => setUserCount(data.length));
    getAllCategories().then(data => setCategoryCount(data.length));
    getAllSkills().then(data => setSkillCount(data.length));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-2 sm:px-6">
      <h2 className="text-3xl font-extrabold mb-6 text-foreground">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="shadow-xl bg-white/80 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold">
              <Users className="w-6 h-6 text-primary" /> Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-primary">{userCount}</div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white/80 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold">
              <Layers className="w-6 h-6 text-accent" /> Total Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-accent">{categoryCount}</div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white/80 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold">
              <ListChecks className="w-6 h-6 text-info" /> Total Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-info">{skillCount}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-xl bg-white/80 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold">
              <TrendingUp className="w-6 h-6 text-warning" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-base text-muted-foreground">Recent admin actions and system activity will appear here.</div>
          </CardContent>
        </Card>
        {/* Add more summary/quick access cards as needed */}
      </div>
    </div>
  );
};

export default AdminDashboard;
