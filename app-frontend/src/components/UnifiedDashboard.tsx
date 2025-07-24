import React, { useState, useEffect } from "react";
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
import { getDashboardAPI, getUserProfileAPI } from "../lib/api";
import { Dialog, DialogContent, DialogFooter, DialogOverlay } from "@/components/ui/dialog";

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
  // User and profile info
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Dashboard stats state
  const [dashboardStats, setDashboardStats] = useState({
    total_number_of_users: 0,
    total_contributors: 0,
    total_star_count: 0,
    total_skill_count: 0,
  });
  // Fetch dashboard stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardAPI();
      if (data && data.total_count) {
        setDashboardStats({
          total_number_of_users: data.total_count.total_number_of_users || 0,
          total_contributors: data.total_count.total_contributors || 0,
          total_star_count: data.total_count.total_star_count || 0,
          total_skill_count: data.total_count.total_skill_count || 0,
        });
      }
    };
    fetchStats();
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    // Fetch profile from API
    getUserProfileAPI().then((data) => {
      setProfile(data);
    });
  }, []);

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
  const openLogoutModal = () => setLogoutModalOpen(true);
  const closeLogoutModal = () => setLogoutModalOpen(false);
  const confirmLogout = () => {
    closeLogoutModal();
    handleLogout();
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-secondary/60">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 min-h-screen bg-card/90 backdrop-blur-lg shadow-xl border-r border-border px-0 py-8 fixed left-0 top-0 z-40">
        <div className="flex flex-col items-center mb-4 mt-4">
             <div className="flex flex-row items-center gap-6 mb-6 justify-start">
          <img src="/Logoone.png" alt="Kudos Logo" className="w-10 h-10 rounded-2xl shadow-md" />       
            <h1 className="text-xl font-bold text-foreground tracking-tight">Kudos<span className="ml-6">✨</span></h1>
        </div>
          {profile && (
            <div className="flex items-center gap-3 bg-white/90 rounded-xl shadow px-4 py-3 w-60">
              <div className="flex-shrink-0">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-8 h-8 rounded-full object-cover border-2 border-primary/30 shadow" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shadow">
                    {profile.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-lg font-bold text-foreground truncate">{profile.name}</div>
                <div className="text-sm text-muted-foreground font-medium truncate">{profile.designation || profile.role}</div>
              </div>
              <div className="flex items-center gap-1 ml-2">
                {/* <svg className="w-5 h-5 text-star" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-6.172 3.245 1.179-6.873-5-4.873 6.9-1.002L12 2.5l3.093 6.747 6.9 1.002-5 4.873 1.179 6.873z" /></svg> */}
                {/* <span className="text-base font-bold text-star">{profile.total_stars ?? 0}</span> */}
              </div>
            </div>
          )}
        </div>
        {/* <div className="flex flex-col items-center gap-6 mb-10">
          <img src="/Logoone.png" alt="Kudos Logo" className="w-14 h-14 rounded-2xl shadow-md" />
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Kudos</h1>
            <p className="text-sm text-muted-foreground font-medium">Recognition & Knowledge Platform</p>
          </div>
        </div> */}
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
            onClick={openLogoutModal}
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
                <h2 className="text-3xl font-extrabold mb-2 text-foreground">Hi, {profile?.username || user?.username || user?.first_name || user?.email || "User"}! ✨</h2>
                <p className="text-lg text-muted-foreground mb-4">Ready to spread some appreciation? </p>
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
                    <div className="text-3xl font-extrabold text-primary mb-1">{dashboardStats.total_star_count}</div>
                    <div className="text-base text-muted-foreground">Total Stars</div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col flex-1 text-center shadow-lg bg-white/70 rounded-xl h-full min-h-[120px]">
                  <CardContent className="pt-6 pb-4 flex-1 flex flex-col justify-end">
                    <div className="text-3xl font-extrabold text-accent mb-1">{dashboardStats.total_contributors}</div>
                    <div className="text-base text-muted-foreground">Contributors</div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col flex-1 text-center shadow-lg bg-white/70 rounded-xl h-full min-h-[120px]">
                  <CardContent className="pt-6 pb-4 flex-1 flex flex-col justify-end">
                    <div className="text-3xl font-extrabold text-info mb-1">{dashboardStats.total_skill_count}</div>
                    <div className="text-base text-muted-foreground">Skills</div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col flex-1 text-center shadow-lg bg-white/70 rounded-xl h-full min-h-[120px]">
                  <CardContent className="pt-6 pb-4 flex-1 flex flex-col justify-end">
                    <div className="text-3xl font-extrabold text-warning mb-1">{dashboardStats.total_number_of_users}</div>
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
      {/* Logout Confirmation Modal */}
      <Dialog open={logoutModalOpen} onOpenChange={(open) => !open && closeLogoutModal()}>
        <DialogOverlay className="fixed inset-0 bg-black/10 z-50" />
        <DialogContent className="max-w-md">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold">Confirm Logout</h3>
            <p className="text-sm">Are you sure you want to logout?</p>
          </div>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={closeLogoutModal}>
              Cancel
            </Button>
            <Button onClick={confirmLogout} variant="destructive">
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnifiedDashboard; 