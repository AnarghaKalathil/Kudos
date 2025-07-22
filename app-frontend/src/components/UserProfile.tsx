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
  "Technical Excellence": "bg-blue-100 text-blue-800",
  "Mentoring": "bg-green-100 text-green-800",
  "Problem Solving": "bg-purple-100 text-purple-800",
  "Collaboration": "bg-orange-100 text-orange-800",
  "Innovation": "bg-pink-100 text-pink-800",
  "Leadership": "bg-yellow-100 text-yellow-800",
  "Support": "bg-indigo-100 text-indigo-800",
  "Knowledge Sharing": "bg-red-100 text-red-800"
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
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Profile Header */}
      <Card className=" shadow-medium">
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl sm:text-2xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">John Doe</h1>
              <p className="text-base sm:text-lg text-muted-foreground">Senior Full Stack Developer</p>
              <p className="text-sm text-muted-foreground">Engineering • john.doe@company.com</p>
              
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-star" />
                  <span className="text-xl sm:text-2xl font-bold text-star">{totalStars}</span>
                  <span className="text-sm text-muted-foreground">stars earned</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recognitions">Recognitions</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Category Breakdown */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Recognition Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(categoryBreakdown).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {count} star{count !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {approvedRecognitions.slice(0, 3).map((recognition) => (
                    <div key={recognition.id} className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-star" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{recognition.from}</span> recognized you
                        </p>
                        <p className="text-xs text-muted-foreground">{recognition.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

         
        </TabsContent>

        <TabsContent value="recognitions" className="space-y-4">
          <div className="space-y-4">
            {approvedRecognitions.map((recognition) => (
              <Card key={recognition.id} className="shadow-medium">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {recognition.fromInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{recognition.from}</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${categoryColors[recognition.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {recognition.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{recognition.date}</span>
                      </div>
                      <p className="text-sm mb-3">{recognition.message}</p>
                      <div className="flex gap-1">
                        {recognition.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-star" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Top Skills</CardTitle>
              <CardDescription>
                Skills you've been recognized for the most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topSkills.map(([skill, count]) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="font-medium">{skill}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(count / Math.max(...Object.values(skillFrequency))) * 100} className="w-20 h-2" />
                      <span className="text-sm text-muted-foreground">{count}</span>
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