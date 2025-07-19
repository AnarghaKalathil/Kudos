import { useState } from "react";
import { Star, Users, Trophy, Search, Plus, Award, Target, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeDirectory } from "@/components/EmployeeDirectory";
import { GiveRecognition } from "@/components/GiveRecognition";
import { UserProfile } from "@/components/UserProfile";
import { TagSearch } from "@/components/TagSearch";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card shadow-soft border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
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
              <Badge variant="secondary" className="gap-1 text-xs">
                <Star className="w-3 h-3" />
                <span className="hidden sm:inline">Level </span>3
              </Badge>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs sm:text-sm font-semibold text-primary-foreground">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b">
        <div className="container mx-auto px-2 sm:px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 bg-transparent h-auto">
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
            </TabsList>

            <TabsContent value="overview" className="py-4 sm:py-6">
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

              {/* Recent Activity */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Recent Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { from: "Alice Chen", to: "Bob Smith", tag: "React Debug", time: "2 hours ago" },
                      { from: "Charlie Kim", to: "Diana Lee", tag: "API Design", time: "4 hours ago" },
                      { from: "Eve Wilson", to: "Frank Davis", tag: "Docker Setup", time: "1 day ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-secondary rounded-lg">
                        <Star className="w-4 h-4 text-star flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                            <span className="font-medium text-sm sm:text-base">{activity.from}</span>
                            <span className="text-muted-foreground text-sm hidden sm:inline"> gave a star to </span>
                            <span className="font-medium text-sm sm:text-base">{activity.to}</span>
                            <span className="text-muted-foreground text-sm hidden sm:inline"> for </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 sm:mt-0 sm:inline">
                            <Badge variant="outline" className="text-xs">{activity.tag}</Badge>
                            <span className="text-xs text-muted-foreground sm:ml-2">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="directory" className="py-4 sm:py-6">
              <EmployeeDirectory />
            </TabsContent>

            <TabsContent value="give" className="py-4 sm:py-6">
              <GiveRecognition />
            </TabsContent>

            <TabsContent value="search" className="py-4 sm:py-6">
              <TagSearch />
            </TabsContent>

            <TabsContent value="profile" className="py-4 sm:py-6">
              <UserProfile />
            </TabsContent>
          </Tabs>
        </div>
      </nav>
    </div>
  );
};

export default Index;
