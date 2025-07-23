import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Users, Trophy, Search, Plus, Award, Target, LogOut, MessageCircle, Layers, ListChecks, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EmployeeDirectory } from "@/components/EmployeeDirectory";
import { GiveRecognition } from "@/components/GiveRecognition";
import { UserProfile } from "@/components/UserProfile";
import { TagSearch } from "@/components/TagSearch";
import RecognitionTabs from "@/components/Leaderboard";
import UsersPage from "@/admin/pages/Userspage";
import CategoriesPage from "@/admin/pages/CategoriesPage";
import SkillList from "@/admin/pages/skillList";

// Dynamic admin flag based on login
const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isSuperuser') === 'true';

export const UnifiedDashboard = () => {
  // Auth check: redirect to login if not authenticated
  if (typeof window !== 'undefined' && !localStorage.getItem('accessToken')) {
    window.location.href = '/';
    return null;
  }

  const [activeTab, setActiveTab] = useState(isAdmin ? "users" : "overview");
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; name: string } | null>(null);
  const [isFromGiveStar, setIsFromGiveStar] = useState(false);
  const navigate = useNavigate();
  // Placeholder user info
  const user = { first_name: "User" };

  // Sidebar navigation items
  const userNav = [
    { key: "overview", label: "Overview", icon: <Target className="w-5 h-5" /> },
    { key: "directory", label: "Directory", icon: <Users className="w-5 h-5" /> },
    { key: "give", label: "Give Star", icon: <Plus className="w-5 h-5" /> },
    { key: "search", label: "Find Expert", icon: <Search className="w-5 h-5" /> },
    { key: "profile", label: "Profile", icon: <Award className="w-5 h-5" /> },
    { key: "review", label: "Reviews", icon: <MessageCircle className="w-5 h-5" /> },
  ];
  const adminNav = [
    { key: "users", label: "Users", icon: <UserCog className="w-5 h-5" /> },
    { key: "categories", label: "Categories", icon: <Layers className="w-5 h-5" /> },
    { key: "skills", label: "Skills", icon: <ListChecks className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isSuperuser");
    localStorage.removeItem("user");
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-secondary/60">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 min-h-screen bg-card/90 backdrop-blur-lg shadow-xl border-r border-border px-0 py-8 fixed left-0 top-0 z-40">
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="w-14 h-14 bg-gradient-to-tr from-primary to-accent rounded-2xl flex items-center justify-center shadow-md">
            <Star className="w-8 h-8 text-primary-foreground drop-shadow" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Kudos</h1>
            <p className="text-sm text-muted-foreground font-medium">Recognition & Knowledge Platform</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2 w-full px-6">
          {(isAdmin ? adminNav : userNav).map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab === item.key ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all hover:bg-muted/60"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 px-2 sm:px-6 py-8 w-full max-w-full pt-16 md:pt-0">
        <div className={isAdmin ? "w-full min-w-0" : "max-w-7xl mx-auto"}>
          {/* User dashboard: Only show dashboard cards/analytics on Overview tab */}
          {!isAdmin && activeTab === 'overview' && (
            <>
              <div className="pt-[72px]" />
              <div className="bg-white/80 backdrop-blur-md border shadow-xl rounded-2xl p-8 mb-8 flex flex-col items-center text-center">
                <h2 className="text-3xl font-extrabold mb-2 text-foreground">Welcome back, {user.first_name}! ✨</h2>
                <p className="text-lg text-muted-foreground mb-4">Ready to spread some appreciation? You have <span className='font-bold text-primary'>3</span> pending recognition requests to review.</p>
                <Button className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition-transform" onClick={() => setActiveTab('review')}>Review Requests</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
                <Card className="flex flex-col flex-1 shadow-xl bg-white/80 backdrop-blur rounded-2xl h-full min-h-[220px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <Star className="w-6 h-6 text-star" /> Quick Recognition
                    </CardTitle>
                    <CardDescription className="text-base">Instantly recognize teammates for their help and expertise</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-end">
                    <Button className="w-full bg-gradient-to-r from-primary to-accent text-white py-2 rounded-lg font-semibold hover:opacity-90 transition" onClick={() => setActiveTab('give')}> <Plus className="w-5 h-5 mr-2" /> Give a Star</Button>
                  </CardContent>
                </Card>
                <Card className="flex flex-col flex-1 shadow-xl bg-white/80 backdrop-blur rounded-2xl h-full min-h-[220px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <Search className="w-6 h-6 text-info" /> Find Experts
                    </CardTitle>
                    <CardDescription className="text-base">Search by skills and tags to find the right person</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-end">
                    <Button variant="outline" className="w-full py-2 rounded-lg font-semibold hover:bg-primary/10 hover:text-primary transition" onClick={() => setActiveTab('search')}> <Search className="w-5 h-5 mr-2" /> Search Skills</Button>
                  </CardContent>
                </Card>
                <Card className="flex flex-col flex-1 shadow-xl bg-white/80 backdrop-blur rounded-2xl h-full min-h-[220px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <Trophy className="w-6 h-6 text-warning" /> Top Contributors
                    </CardTitle>
                    <CardDescription className="text-base">See who's making the biggest impact this month</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-end">
                    <Button variant="outline" className="w-full py-2 rounded-lg font-semibold hover:bg-primary/10 hover:text-primary transition" onClick={() => setActiveTab('directory')}> <Trophy className="w-5 h-5 mr-2" /> View Directory</Button>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <Card className="flex flex-col flex-1 text-center shadow-lg bg-white/70 rounded-xl h-full min-h-[120px]">
                  <CardContent className="pt-6 pb-4 flex-1 flex flex-col justify-end">
                    <div className="text-3xl font-extrabold text-primary mb-1">247</div>
                    <div className="text-base text-muted-foreground">Total Stars</div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col flex-1 text-center shadow-lg bg-white/70 rounded-xl h-full min-h-[120px]">
                  <CardContent className="pt-6 pb-4 flex-1 flex flex-col justify-end">
                    <div className="text-3xl font-extrabold text-accent mb-1">89</div>
                    <div className="text-base text-muted-foreground">Contributors</div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col flex-1 text-center shadow-lg bg-white/70 rounded-xl h-full min-h-[120px]">
                  <CardContent className="pt-6 pb-4 flex-1 flex flex-col justify-end">
                    <div className="text-3xl font-extrabold text-info mb-1">16</div>
                    <div className="text-base text-muted-foreground">Skills</div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col flex-1 text-center shadow-lg bg-white/70 rounded-xl h-full min-h-[120px]">
                  <CardContent className="pt-6 pb-4 flex-1 flex flex-col justify-end">
                    <div className="text-3xl font-extrabold text-warning mb-1">23</div>
                    <div className="text-base text-muted-foreground">Users</div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
          {/* Admin Content */}
          {isAdmin && (
            <>
              <div className="mb-6">
                <div className="text-2xl font-bold text-primary bg-muted rounded-xl px-6 py-4 shadow w-fit border border-primary/20">
                  Hi Admin 👋
                </div>
              </div>
              {activeTab === 'users' && <div className="w-full"><UsersPage /></div>}
              {activeTab === 'categories' && <div className="w-full"><CategoriesPage /></div>}
              {activeTab === 'skills' && <div className="w-full"><SkillList /></div>}
            </>
          )}
          {/* User Content */}
          {!isAdmin && activeTab === 'directory' && <EmployeeDirectory onGiveStar={(employee) => { setSelectedEmployee({ id: employee.id.toString(), name: employee.name }); setIsFromGiveStar(true); setActiveTab('give'); }} />}
          {!isAdmin && activeTab === 'give' && <GiveRecognition selectedEmployee={selectedEmployee} isFromGiveStar={isFromGiveStar} />}
          {!isAdmin && activeTab === 'search' && <TagSearch onGiveStar={(employee) => { setSelectedEmployee({ id: employee.id.toString(), name: employee.name }); setIsFromGiveStar(true); setActiveTab('give'); }} />}
          {!isAdmin && activeTab === 'profile' && <UserProfile />}
          {!isAdmin && activeTab === 'review' && <RecognitionTabs />}
        </div>
      </main>
    </div>
  );
};

export default UnifiedDashboard; 