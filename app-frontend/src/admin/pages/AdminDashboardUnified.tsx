import React, { useState } from "react";
import UsersPage from "./Userspage";
import CategoriesPage from "./CategoriesPage";
import SkillList from "./skillList";
import AdminDashboard from "./AdminDashboard";
import { PanelLeft, Users, List, Star, Layers } from "lucide-react";

const AdminDashboardUnified = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-secondary/60">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 min-h-screen bg-card/90 backdrop-blur-lg shadow-xl border-r border-border px-0 py-8 fixed left-0 top-0 z-40">
     <div className="flex flex-col items-center gap-6 mb-10 pt-8">
            <img src="/Logoone.png" alt="Kudos Logo" className="w-14 h-14 rounded-2xl shadow-md" />
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Kudos</h1>
              <p className="text-sm text-muted-foreground font-medium">Recognition & Knowledge Platform</p>
            </div>
          </div>
        <nav className="flex flex-col gap-2 w-full px-6">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='overview' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><PanelLeft className="w-5 h-5" /> Overview</button>
          <button onClick={() => setActiveTab('users')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='users' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Users className="w-5 h-5" /> Users</button>
          <button onClick={() => setActiveTab('categories')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='categories' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><List className="w-5 h-5" /> Categories</button>
          <button onClick={() => setActiveTab('skills')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='skills' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Layers className="w-5 h-5" /> Skills</button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 px-2 sm:px-6 py-8 w-full max-w-full pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="text-2xl font-bold text-primary-foreground bg-primary/10 rounded-xl px-6 py-4 shadow-md w-fit">Hi Admin 👋</div>
          </div>
          {activeTab === "overview" && <AdminDashboard />}
          {activeTab === "users" && <UsersPage />}
          {activeTab === "categories" && <CategoriesPage />}
          {activeTab === "skills" && <SkillList />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardUnified; 