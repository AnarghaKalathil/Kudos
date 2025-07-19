import { useState } from "react";
import { Trophy, Star, TrendingUp, Calendar, Award, Users, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeaderboardEntry {
  id: string;
  name: string;
  role: string;
  department: string;
  stars: number;
  rank: number;
  change: number; // positive for up, negative for down
  initials: string;
  level: number;
  topSkills: string[];
}

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Alice Chen",
    role: "Senior Frontend Developer",
    department: "Engineering",
    stars: 42,
    rank: 1,
    change: 2,
    initials: "AC",
    level: 5,
    topSkills: ["React", "TypeScript", "UI/UX"]
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Backend Engineer",
    department: "Engineering",
    stars: 38,
    rank: 2,
    change: -1,
    initials: "BS",
    level: 4,
    topSkills: ["Node.js", "API Design", "Database"]
  },
  {
    id: "3",
    name: "Charlie Kim",
    role: "Product Manager",
    department: "Product",
    stars: 35,
    rank: 3,
    change: 1,
    initials: "CK",
    level: 4,
    topSkills: ["Strategy", "Analytics", "Leadership"]
  },
  {
    id: "4",
    name: "Eve Wilson",
    role: "DevOps Engineer",
    department: "Engineering",
    stars: 31,
    rank: 4,
    change: 0,
    initials: "EW",
    level: 4,
    topSkills: ["Docker", "Kubernetes", "AWS"]
  },
  {
    id: "5",
    name: "Diana Lee",
    role: "UX Designer",
    department: "Design",
    stars: 29,
    rank: 5,
    change: 1,
    initials: "DL",
    level: 3,
    topSkills: ["Figma", "User Research", "Prototyping"]
  },
  {
    id: "6",
    name: "Frank Davis",
    role: "Data Scientist",
    department: "Analytics",
    stars: 22,
    rank: 6,
    change: -2,
    initials: "FD",
    level: 3,
    topSkills: ["Python", "Machine Learning", "Statistics"]
  },
  {
    id: "7",
    name: "Grace Park",
    role: "Marketing Manager",
    department: "Marketing",
    stars: 19,
    rank: 7,
    change: 3,
    initials: "GP",
    level: 2,
    topSkills: ["Content Strategy", "Analytics", "Brand"]
  },
  {
    id: "8",
    name: "Henry Liu",
    role: "Sales Engineer",
    department: "Sales",
    stars: 17,
    rank: 8,
    change: 0,
    initials: "HL",
    level: 2,
    topSkills: ["Technical Sales", "Demo", "Support"]
  }
];

const departmentStats = [
  { name: "Engineering", stars: 111, members: 4, avgStars: 27.8 },
  { name: "Product", stars: 35, members: 1, avgStars: 35.0 },
  { name: "Design", stars: 29, members: 1, avgStars: 29.0 },
  { name: "Analytics", stars: 22, members: 1, avgStars: 22.0 },
  { name: "Marketing", stars: 19, members: 1, avgStars: 19.0 },
  { name: "Sales", stars: 17, members: 1, avgStars: 17.0 }
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
  if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Trophy className="w-5 h-5 text-amber-600" />;
  return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
};

const getChangeIcon = (change: number) => {
  if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (change < 0) return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
  return <span className="w-4 h-4 flex items-center justify-center text-muted-foreground">-</span>;
};

export const Leaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [activeTab, setActiveTab] = useState("individual");

  const filteredData = mockLeaderboardData.filter(entry => 
    selectedDepartment === "all" || entry.department === selectedDepartment
  );

  const departments = ["all", ...new Set(mockLeaderboardData.map(entry => entry.department))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Leaderboard</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Top contributors and recognition leaders</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Individual
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Departments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4">
          {/* Top 3 Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {filteredData.slice(0, 3).map((entry, index) => (
              <Card key={entry.id} className={`bg-gradient-card shadow-medium ${index === 0 ? 'ring-2 ring-yellow-400' : ''}`}>
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-3">
                    {getRankIcon(entry.rank)}
                  </div>
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                      {entry.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{entry.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{entry.role}</p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-star" />
                    <span className="text-2xl font-bold text-star">{entry.stars}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Level {entry.level}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Full Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredData.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {getRankIcon(entry.rank)}
                      <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs sm:text-sm">
                          {entry.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <span className="font-semibold text-sm sm:text-base truncate">{entry.name}</span>
                        <Badge variant="outline" className="text-xs w-fit">
                          {entry.department}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{entry.role}</p>
                      
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {entry.topSkills.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {entry.topSkills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{entry.topSkills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-star" />
                        <span className="text-sm sm:text-lg font-bold text-star">{entry.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getChangeIcon(entry.change)}
                        <span className="hidden sm:inline">
                          {entry.change > 0 ? `+${entry.change}` : entry.change === 0 ? "No change" : entry.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {departmentStats.map((dept, index) => (
              <Card key={dept.name} className="bg-gradient-card shadow-medium">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-amber-600' : 'bg-muted'
                    }`} />
                    {dept.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Stars</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-star" />
                        <span className="font-bold text-star">{dept.stars}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Members</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-info" />
                        <span className="font-bold text-info">{dept.members}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg Stars</span>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-accent" />
                        <span className="font-bold text-accent">{dept.avgStars}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Recognition statistics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={dept.name} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-32">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-amber-600' : 'bg-muted'
                      }`} />
                      <span className="font-medium">{dept.name}</span>
                    </div>
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(dept.stars / Math.max(...departmentStats.map(d => d.stars))) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium w-16 text-right">{dept.stars} stars</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};