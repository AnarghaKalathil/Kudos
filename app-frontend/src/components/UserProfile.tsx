import { useEffect, useState } from "react";
import { Star, Award,  TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { getUserProfileAPI, getAllRecognitionsAPI } from "@/lib/api";

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

// Add a vibrant color palette for category badges
const badgeColors = [
  'bg-green-100 text-green-800',
  'bg-blue-100 text-blue-800',
  'bg-yellow-100 text-yellow-800',
  'bg-pink-100 text-pink-800',
  'bg-purple-100 text-purple-800',
  'bg-red-100 text-red-800',
  'bg-teal-100 text-teal-800',
  'bg-orange-100 text-orange-800',
  'bg-indigo-100 text-indigo-800',
  'bg-cyan-100 text-cyan-800',
  'bg-lime-100 text-lime-800',
  'bg-fuchsia-100 text-fuchsia-800',
  'bg-amber-100 text-amber-800',
  'bg-rose-100 text-rose-800',
  'bg-violet-100 text-violet-800',
  'bg-sky-100 text-sky-800',
];
function getCategoryBadgeColor(category: string) {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % badgeColors.length;
  return badgeColors[idx];
}

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [recognitions, setRecognitions] = useState<Recognition[]>([]);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [receiverRecognitions, setReceiverRecognitions] = useState<any[]>([]);
  const [senderRecognitions, setSenderRecognitions] = useState<any[]>([]);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    let localUser = null;
    if (userData) {
      localUser = JSON.parse(userData);
      setUser(localUser);
    }
    getUserProfileAPI().then((data) => {
      console.log('Profile API response:', data);
      setProfile(data);
      if (data && Array.isArray(data.recognitions)) {
        const username = localUser?.username?.toLowerCase();
        const received = data.recognitions.filter((rec: any) =>
          (rec.receiver && rec.receiver.toLowerCase() === username)
        );
        const sent = data.recognitions.filter((rec: any) =>
          (rec.sender && rec.sender.toLowerCase() === username)
        );
        setReceiverRecognitions(received);
        setSenderRecognitions(sent);
      }
    });
  }, []);

  const approvedRecognitions = recognitions.filter(r => r.status === "approved");
  const pendingRecognitions = recognitions.filter(r => r.status === "pending");
  
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
      <Card className="shadow-xl bg-white/80 backdrop-blur rounded-2xl">
        <CardContent className="pt-8 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <Avatar className="w-24 h-24 border-4 border-primary/30 shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-extrabold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-1">{profile?.name || user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`}</h1>
          
              <p className="text-lg sm:text-xl text-muted-foreground font-medium">{user?.designation || user?.role}</p>
              <p className="text-base text-muted-foreground mb-2">{user?.department}  {user?.email}</p>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-star" />
                  <span className="text-2xl sm:text-3xl font-extrabold text-star">{profile?.total_stars ?? totalStars}</span>
                  <span className="text-base text-muted-foreground">stars earned</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/40 mb-6">
          <TabsTrigger value="overview" className="rounded-xl text-lg font-semibold data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Overview</TabsTrigger>
          <TabsTrigger value="recognitions" className="rounded-xl text-lg font-semibold data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Recognitions</TabsTrigger>
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
                    {profile?.star_summary && Object.entries(profile.star_summary).length > 0 ? (
                      Object.entries(profile.star_summary).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-base font-semibold">{category}</span>
                          <span className="text-xl font-bold text-star">{String(count)}★</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No star summary available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Recent Activity (now Skills) */}
            <div className="flex flex-col h-full">
              <Card className="flex flex-col flex-1 shadow-xl bg-white/80 rounded-2xl h-full min-h-[420px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <TrendingUp className="w-6 h-6" /> Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {(() => {
                      // Collect all skills from recognitions
                      const allSkills = [] as string[];
                      (profile?.recognitions || []).forEach((rec: any) => {
                        if (Array.isArray(rec.skills)) {
                          rec.skills.forEach((skill: string) => {
                            if (skill && !allSkills.includes(skill)) {
                              allSkills.push(skill);
                            }
                          });
                        }
                      });
                      return allSkills.length === 0 ? (
                        <span className="text-muted-foreground text-sm">No skills listed.</span>
                      ) : (
                        allSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="rounded-full px-3 py-1 text-base font-medium">
                            {skill}
                          </Badge>
                        ))
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="recognitions" className="space-y-6">
          {/* Sub-tabs for Received/Sent: visually distinct, smaller, subtle */}
          <Tabs defaultValue="received" className="w-full">
            <TabsList className="flex w-full justify-center gap-2 rounded-lg bg-muted/20 mb-4 p-1">
              <TabsTrigger value="received" className="rounded-md px-4 py-1 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary bg-white/60 text-muted-foreground transition">Received</TabsTrigger>
              <TabsTrigger value="sent" className="rounded-md px-4 py-1 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary bg-white/60 text-muted-foreground transition">Sent</TabsTrigger>
            </TabsList>
            <TabsContent value="received" className="space-y-6">
              {receiverRecognitions.length === 0 ? (
                <p className="text-muted-foreground text-sm">No recognitions received.</p>
              ) : (
                receiverRecognitions.map((recognition) => (
                  <Card key={recognition.id || recognition.message + recognition.receiver} className="shadow-xl bg-white/80 rounded-2xl">
                    <CardContent className="pt-8 pb-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10 border-2 border-primary/30">
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                            {recognition.sender?.[0]?.toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{recognition.sender}</span>
                            <Badge
                              className={`rounded-full px-3 py-1 text-base font-semibold ${getCategoryBadgeColor(recognition.category)}`}
                            >
                              {recognition.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{recognition.date || recognition.createdAt || ''}</p>
                          <p className="text-base mb-3">{recognition.message}</p>
                          <div className="flex gap-2">
                            {(recognition.skills || []).map((tag: string, index: number) => (
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
                ))
              )}
            </TabsContent>
            <TabsContent value="sent" className="space-y-6">
              {senderRecognitions.length === 0 ? (
                <p className="text-muted-foreground text-sm">No recognitions sent.</p>
              ) : (
                senderRecognitions.map((recognition) => (
                  <Card key={recognition.id || recognition.message + recognition.sender} className="shadow-xl bg-white/80 rounded-2xl">
                    <CardContent className="pt-8 pb-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10 border-2 border-primary/30">
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                            {recognition.receiver?.[0]?.toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{recognition.receiver}</span>
                            <Badge
                              className={`rounded-full px-3 py-1 text-base font-semibold ${getCategoryBadgeColor(recognition.category)}`}
                            >
                              {recognition.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{recognition.date || recognition.createdAt || ''}</p>
                          <p className="text-base mb-3">{recognition.message}</p>
                          <div className="flex gap-2">
                            {(recognition.skills || []).map((tag: string, index: number) => (
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
                ))
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>

      </Tabs>
    </div>
  );
};