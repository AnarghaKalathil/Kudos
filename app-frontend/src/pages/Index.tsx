import { useState, useEffect } from "react";
import { Star, Users, Trophy, Search, Plus, Award, Target, LogOut,MessageCircle, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeDirectory } from "@/components/EmployeeDirectory";
import { GiveRecognition } from "@/components/GiveRecognition";
import { UserProfile } from "@/components/UserProfile";
import { TagSearch } from "@/components/TagSearch";
import RecognitionTabs from "@/components/Leaderboard";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { logoutAPI, getUserProfileAPI } from "@/lib/api";


const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; name: string } | null>(null);
  const [isFromGiveStar, setIsFromGiveStar] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUserProfileAPI().then((data) => {
      if (data) setUser(data);
    });
  }, []);

    const handleLogout = async () => {
    await logoutAPI();
    window.location.href = "/";
  };

  return (
    
    <div className="min-h-screen flex bg-gradient-to-br from-background to-secondary/60">
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 flex items-center bg-card/90 backdrop-blur-lg shadow-lg h-16 px-4 justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-muted/60 transition">
          <PanelLeft className="w-7 h-7 text-primary" />
        </button>
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-foreground tracking-tight justify-start">Kudos</h3>
          <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center shadow">
            <span className="text-base font-bold text-primary-foreground">JD</span>
          </div>
        </div>
      </div>
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-card/90 backdrop-blur-lg shadow-xl border-r border-border px-0 py-8 fixed left-0 top-0 z-40">
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
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='overview' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Target className="w-5 h-5" /> Overview</button>
          <button onClick={() => setActiveTab('directory')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='directory' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Users className="w-5 h-5" /> Directory</button>
          <button onClick={() => setActiveTab('give')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='give' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Plus className="w-5 h-5" /> Give Star</button>
          <button onClick={() => setActiveTab('search')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='search' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Search className="w-5 h-5" /> Find Expert</button>
          <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='profile' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Award className="w-5 h-5" /> Profile</button>
          <button onClick={() => setActiveTab('review')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='review' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><MessageCircle className="w-5 h-5" /> Reviews</button>
          <button
            onClick={() => {
              setActiveTab('logout');
              handleLogout();
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab === 'logout' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>

        </nav>
        {/* <div className="flex flex-col items-center mt-auto gap-4 px-6 pt-10">
          <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center shadow">
            <span className="text-base font-bold text-primary-foreground">JD</span>
          </div>
        </div> */}
      </aside>
      {/* Sidebar (mobile Sheet) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-card/90 backdrop-blur-lg border-r border-border">
          <div className="flex flex-col items-center gap-6 mb-10 pt-8">
            <div className="w-14 h-14 bg-gradient-to-tr from-primary to-accent rounded-2xl flex items-center justify-center shadow-md">
              <Star className="w-8 h-8 text-primary-foreground drop-shadow" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Kudos</h1>
              <p className="text-sm text-muted-foreground font-medium">Recognition & Knowledge Platform</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2 w-full px-6">
            <button onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='overview' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Target className="w-5 h-5" /> Overview</button>
            <button onClick={() => { setActiveTab('directory'); setSidebarOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='directory' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Users className="w-5 h-5" /> Directory</button>
            <button onClick={() => { setActiveTab('give'); setSidebarOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='give' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Plus className="w-5 h-5" /> Give Star</button>
            <button onClick={() => { setActiveTab('search'); setSidebarOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='search' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Search className="w-5 h-5" /> Find Expert</button>
            <button onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='profile' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><Award className="w-5 h-5" /> Profile</button>
            <button onClick={() => { setActiveTab('review'); setSidebarOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab==='review' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}><MessageCircle className="w-5 h-5" /> Reviews</button>
                 <button
            onClick={() => {
              setActiveTab('logout');
              handleLogout();
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${activeTab === 'logout' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'}`}
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
          </nav>
   
        </SheetContent>
      </Sheet>
      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 px-2 sm:px-6 py-8 w-full max-w-full pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto">
          {/* Tabs as hidden, only sidebar controls activeTab */}
          <div className="hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} />
          </div>
          {/* Overview */}
          {activeTab === 'overview' && (
            <section>
              <div className="bg-white/80 backdrop-blur-md border shadow-xl rounded-2xl p-8 mb-12 mt-10 flex flex-col items-center text-center">
                <h2 className="text-3xl font-extrabold mb-2 text-foreground">Welcome back, {user?.first_name || user?.username || "User"}! ✨</h2>
                <p className="text-lg text-muted-foreground mb-4">Ready to spread some appreciation? You have <span className='font-bold text-primary'>3</span> pending recognition requests to review.</p>
                <Button className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition-transform" onClick={() => setActiveTab('review')}>Review Requests</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
                {[0,1,2].map((i) => (
                  <div key={i} className="flex flex-col h-full">
                    <Card className="flex flex-col flex-1 shadow-xl bg-white/80 backdrop-blur rounded-2xl hover:scale-[1.02] transition-transform h-full min-h-[220px]">
                      {/* Card content here, see below for actual content */}
                      {i === 0 && (
                        <>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl font-bold">
                              <Star className="w-6 h-6 text-star" /> Quick Recognition
                            </CardTitle>
                            <CardDescription className="text-base">Instantly recognize teammates for their help and expertise</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1 flex flex-col justify-end">
                            <Button className="w-full bg-gradient-to-r from-primary to-accent text-white py-2 rounded-lg font-semibold hover:opacity-90 transition" onClick={() => setActiveTab('give')}> <Plus className="w-5 h-5 mr-2" /> Give a Star</Button>
                          </CardContent>
                        </>
                      )}
                      {i === 1 && (
                        <>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl font-bold">
                              <Search className="w-6 h-6 text-info" /> Find Experts
                            </CardTitle>
                            <CardDescription className="text-base">Search by skills and tags to find the right person</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1 flex flex-col justify-end">
                            <Button variant="outline" className="w-full  py-2 rounded-lg font-semibold hover:bg-primary/10 hover:text-primary transition" onClick={() => setActiveTab('search')}> <Search className="w-5 h-5 mr-2" /> Search Skills</Button>
                          </CardContent>
                        </>
                      )}
                      {i === 2 && (
                        <>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl font-bold">
                              <Trophy className="w-6 h-6 text-warning" /> Top Contributors
                            </CardTitle>
                            <CardDescription className="text-base">See who's making the biggest impact this month</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1 flex flex-col justify-end">
                            <Button variant="outline" className="w-full py-2 rounded-lg font-semibold hover:bg-primary/10 hover:text-primary transition" onClick={() => setActiveTab('directory')}> <Trophy className="w-5 h-5 mr-2" /> View Directory</Button>
                          </CardContent>
                        </>
                      )}
                    </Card>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="flex flex-col h-full">
                    <Card className="flex flex-col flex-1 text-center shadow-lg bg-white/70 rounded-xl h-full min-h-[160px]">
                      <CardContent className="pt-6 pb-4 flex-1 flex flex-col justify-end">
                        {i === 0 && (<><div className="text-3xl font-extrabold text-primary mb-1">247</div><div className="text-base text-muted-foreground">Total Stars</div></>)}
                        {i === 1 && (<><div className="text-3xl font-extrabold text-accent mb-1">89</div><div className="text-base text-muted-foreground">Contributors</div></>)}
                        {i === 2 && (<><div className="text-3xl font-extrabold text-info mb-1">16</div><div className="text-base text-muted-foreground">Skills</div></>)}
                        {i === 3 && (<><div className="text-3xl font-extrabold text-warning mb-1">23</div><div className="text-base text-muted-foreground">Users</div></>)}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* Directory */}
          {activeTab === 'directory' && <EmployeeDirectory onGiveStar={(employee) => { setSelectedEmployee({ id: employee.id.toString(), name: employee.name }); setIsFromGiveStar(true); setActiveTab('give'); }} />}
          {/* Give Star */}
          {activeTab === 'give' && <GiveRecognition selectedEmployee={selectedEmployee} isFromGiveStar={isFromGiveStar} />}
          {/* Tag Search */}
          {activeTab === 'search' && <TagSearch onGiveStar={(employee) => { setSelectedEmployee({ id: employee.id.toString(), name: employee.name }); setIsFromGiveStar(true); setActiveTab('give'); }} />}
          {/* Profile */}
          {activeTab === 'profile' && <UserProfile />}
          {/* Reviews */}
          {activeTab === 'review' && <RecognitionTabs />}
        </div>
      </main>
    </div>
  );
};

export default Index;
