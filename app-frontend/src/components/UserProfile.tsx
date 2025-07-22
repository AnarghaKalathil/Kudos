import { useState } from "react";
import { Star, Award, Trophy, Calendar, MessageCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface Recognition {
  id: string;
  from: string;
  fromInitials: string;
  category: string;
  message: string;
  tags: string[];
  date: string;
  reviewer: string;
  status: "approved" | "pending" | "rejected";
}

const mockRecognitions: Recognition[] = [
  {
    id: "1",
    from: "Alice Chen",
    fromInitials: "AC",
    category: "Technical Excellence",
    message: "John helped me implement a complex React component with excellent performance optimization techniques.",
    tags: ["React", "Performance", "TypeScript"],
    date: "2024-01-15",
    reviewer: "Tech Lead",
    status: "approved"
  },
  {
    id: "2",
    from: "Bob Smith",
    fromInitials: "BS",
    category: "Mentoring",
    message: "John provided excellent guidance on API design principles and helped me understand best practices.",
    tags: ["API Design", "Mentoring", "Backend"],
    date: "2024-01-10",
    reviewer: "Manager",
    status: "approved"
  },
  {
    id: "3",
    from: "Charlie Kim",
    fromInitials: "CK",
    category: "Problem Solving",
    message: "John quickly identified and resolved a critical bug in our authentication system.",
    tags: ["Authentication", "Bug Fix", "Security"],
    date: "2024-01-08",
    reviewer: "Manager",
    status: "approved"
  },
  {
    id: "4",
    from: "Diana Lee",
    fromInitials: "DL",
    category: "Collaboration",
    message: "John collaborated effectively with the design team to implement pixel-perfect UI components.",
    tags: ["UI/UX", "Collaboration", "Frontend"],
    date: "2024-01-05",
    reviewer: "Design Lead",
    status: "pending"
  }
];

const categoryColors = {
  "Technical Excellence": "bg-primary/10 text-primary",
  "Mentoring": "bg-accent/10 text-accent",
  "Problem Solving": "bg-info/10 text-info",
  "Collaboration": "bg-secondary/20 text-secondary-foreground",
  "Innovation": "bg-warning/10 text-warning",
  "Leadership": "bg-success/10 text-success",
  "Support": "bg-muted/10 text-muted-foreground",
  "Knowledge Sharing": "bg-destructive/10 text-destructive"
};

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const approvedRecognitions = mockRecognitions.filter(r => r.status === "approved");
  const pendingRecognitions = mockRecognitions.filter(r => r.status === "pending");
  
  const totalStars = approvedRecognitions.length;
  const categoryBreakdown = approvedRecognitions.reduce((acc, rec) => {
    acc[rec.category] = (acc[rec.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const skillFrequency = approvedRecognitions.reduce((acc, rec) => {
    rec.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  
  const topSkills = Object.entries(skillFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  const currentLevel = Math.floor(totalStars / 10) + 1;
  const nextLevelProgress = (totalStars % 10) * 10;

  return (
    <div className="max-w-4xl mx-auto space-y-10 px-4 sm:px-0 mt-10">
      {/* Profile Header */}
      <Card className="shadow-2xl bg-white/80 backdrop-blur rounded-2xl">
        <CardContent className="pt-8 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <Avatar className="w-24 h-24 border-4 border-primary/30 shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-extrabold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-1">John Doe</h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium">Senior Full Stack Developer</p>
              <p className="text-base text-muted-foreground mb-2">Engineering • john.doe@company.com</p>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-star" />
                  <span className="text-2xl sm:text-3xl font-extrabold text-star">{totalStars}</span>
                  <span className="text-base text-muted-foreground">stars earned</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-warning" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted/40 mb-6">
          <TabsTrigger value="overview" className="rounded-xl text-lg font-semibold data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Overview</TabsTrigger>
          <TabsTrigger value="recognitions" className="rounded-xl text-lg font-semibold data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Recognitions</TabsTrigger>
          <TabsTrigger value="skills" className="rounded-xl text-lg font-semibold data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Breakdown */}
            <div className="flex flex-col h-full">
              <Card className="flex flex-col flex-1 shadow-xl bg-white/80 rounded-2xl h-full min-h-[320px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <Award className="w-6 h-6" /> Recognition Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(categoryBreakdown).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-base font-semibold">{category}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="rounded-full px-3 py-1 text-base font-semibold">
                            {count} star{count !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Recent Activity */}
            <div className="flex flex-col h-full">
              <Card className="flex flex-col flex-1 shadow-xl bg-white/80 rounded-2xl h-full min-h-[320px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <TrendingUp className="w-6 h-6" /> Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {approvedRecognitions.slice(0, 3).map((recognition) => (
                      <div key={recognition.id} className="flex items-center gap-4">
                        <Star className="w-5 h-5 text-star" />
                        <div className="flex-1">
                          <p className="text-base font-semibold">
                            <span className="font-bold">{recognition.from}</span> recognized you
                          </p>
                          <p className="text-xs text-muted-foreground">{recognition.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="recognitions" className="space-y-6">
          <div className="space-y-6">
            {approvedRecognitions.map((recognition) => (
              <Card key={recognition.id} className="shadow-xl bg-white/80 rounded-2xl">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 border-2 border-primary/30">
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                        {recognition.fromInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{recognition.from}</span>
                        <Badge 
                          variant="secondary" 
                          className={`rounded-full px-3 py-1 text-base font-semibold ${categoryColors[recognition.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {recognition.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{recognition.date}</span>
                      </div>
                      <p className="text-base mb-3">{recognition.message}</p>
                      <div className="flex gap-2">
                        {recognition.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="rounded-full px-3 py-1 text-sm font-medium">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Star className="w-6 h-6 text-star" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="skills" className="space-y-6">
          <Card className="shadow-xl bg-white/80 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Top Skills</CardTitle>
              <CardDescription className="text-base">Skills you've been recognized for the most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSkills.map(([skill, count]) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="font-semibold text-base">{skill}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(count / Math.max(...Object.values(skillFrequency))) * 100} className="w-32 h-2 rounded-full" />
                      <span className="text-base text-muted-foreground">{count}</span>
                    </div>
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