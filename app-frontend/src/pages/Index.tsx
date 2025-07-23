import { useState } from "react";
import { Star, Users, Trophy, Search, Plus, Award, Target, LogOut,MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeDirectory } from "@/components/EmployeeDirectory";
import { GiveRecognition } from "@/components/GiveRecognition";
import { UserProfile } from "@/components/UserProfile";
import { TagSearch } from "@/components/TagSearch";
import RecognitionTabs from "@/components/Leaderboard";


const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; name: string } | null>(null);
  const [isFromGiveStar, setIsFromGiveStar] = useState(false);

    const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    sessionStorage.clear();
     window.location.href = "/"; 
    }

  return (
    
    <div className="h-full bg-gradient-hero min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white ">
      <header className="bg-card shadow-soft border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-foreground">PeerStar</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Recognition & Knowledge Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs sm:text-sm font-semibold text-primary-foreground">JD</span>
              </div>
                         <Badge variant="secondary" className="gap-1 text-s cursor-pointer" onClick={handleLogout}>
                <LogOut className="w-5 h-6" />
                <span className="hidden sm:inline" >log out </span> 
              </Badge>
            </div>
          </div>
        </div>
      </header>
      </div>

      {/* Navigation */}
      <nav className="bg-card border-b">
        <div className="container mx-auto px-2 sm:px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 bg-transparent h-auto">
              <TabsTrigger value="overview" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">Home</span>
              </TabsTrigger>
              <TabsTrigger value="directory" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Directory</span>
                <span className="sm:hidden">People</span>
              </TabsTrigger>
              <TabsTrigger value="give" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Give Star</span>
                <span className="sm:hidden">Give</span>
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Find Expert</span>
                <span className="sm:hidden">Search</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Profile</span>
                <span className="sm:hidden">Me</span>
              </TabsTrigger>
                   <TabsTrigger value="review" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View Reviews</span>
                <span className="sm:hidden">Review</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="py-4 sm:py-6">
              <div className="bg-gradient-primary rounded-xl p-6 mb-16 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, John! ✨</h2>
                <p className="text-white/90 mb-4">
                  Ready to spread some appreciation? You have 3 pending recognition requests to review.
                </p>
                <Button className="bg-white text-primary hover:bg-white/90" onClick={() => setActiveTab("review")}>
                  Review Requests
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <Card className="bg-gradient-card shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-star" />
                      Quick Recognition
                    </CardTitle>
                    <CardDescription>
                      Instantly recognize teammates for their help and expertise
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                      onClick={() => setActiveTab("give")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Give a Star
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-info" />
                      Find Experts
                    </CardTitle>
                    <CardDescription>
                      Search by skills and tags to find the right person
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveTab("search")}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Search Skills
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-warning" />
                      Top Contributors
                    </CardTitle>
                    <CardDescription>
                      See who's making the biggest impact this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveTab("directory")}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      View Directory
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Card className="text-center">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">247</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Total Stars</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="text-2xl sm:text-3xl font-bold text-accent mb-1 sm:mb-2">89</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Contributors</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="text-2xl sm:text-3xl font-bold text-info mb-1 sm:mb-2">156</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Skills</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="text-2xl sm:text-3xl font-bold text-warning mb-1 sm:mb-2">23</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Experts</div>
                  </CardContent>
                </Card>
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
      </nav>
    </div>
  );
};

export default Index;
