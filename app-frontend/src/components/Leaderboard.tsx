"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Star } from "lucide-react";

// Recognition interface
interface Recognition {
  id: string;
  from: string;
  to: string;
  skill: string;
  category: string;
  timeAgo: string;
  message: string;
  tags: string[];
  status: "pending" | "accepted" | "rejected";
}

// Dummy recognitions
const initialRecognitions: Recognition[] = [
  {
    id: "r1",
    from: "Alice Cheng",
    to: "Bob Smith",
    skill: "React Debug",
    category: "Frontend",
    timeAgo: "2 hours ago",
    message: "Great work tracking down that nasty bug!",
    tags: ["JS", "Bug Fix", "Hooks"],
    status: "pending"
  },
  {
    id: "r2",
    from: "Charlie Kim",
    to: "Diana Lee",
    skill: "API Design",
    category: "Backend",
    timeAgo: "4 hours ago",
    message: "Loved your clean API structure!",
    tags: ["REST", "Design", "Docs"],
    status: "pending"
  },
  {
    id: "r3",
    from: "Eve Wilson",
    to: "Frank Davis",
    skill: "Docker Setup",
    category: "DevOps",
    timeAgo: "1 day ago",
    message: "Setup worked flawlessly across environments!",
    tags: ["Docker", "CI/CD"],
    status: "accepted"
  },
  {
    id: "r4",
    from: "Jake Brown",
    to: "Sarah Green",
    skill: "Tailwind Mastery",
    category: "Frontend",
    timeAgo: "3 days ago",
    message: "Loved the clean responsive UI you built.",
    tags: ["Tailwind", "CSS", "Design"],
    status: "rejected"
  }
];

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-100 text-blue-800",
  Backend: "bg-green-100 text-green-800",
  DevOps: "bg-yellow-100 text-yellow-800"
};

export default function RecognitionTabs() {
  const [recognitions, setRecognitions] = useState(initialRecognitions);
  const [activeTab, setActiveTab] = useState<"pending" | "accepted" | "rejected">("pending");

  const handleStatusChange = (id: string, newStatus: Recognition["status"]) => {
    setRecognitions((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, status: newStatus } : rec
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
      <Card className="w-full flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Recent Recognition</h2>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as Recognition["status"])}
          className="flex flex-col flex-1"
        >
          <TabsList className="grid grid-cols-3 p-4 gap-2 h-16">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          {["pending", "accepted", "rejected"].map((status) => (
            <TabsContent
              key={status}
              value={status}
              className="p-4 flex-1 overflow-auto"
            >
              {recognitions.filter((r) => r.status === status).length === 0 ? (
                <p className="text-muted-foreground text-sm">No {status} recognitions.</p>
              ) : (
                <div className="space-y-4">
                  {recognitions
                    .filter((r) => r.status === status)
                    .map((recognition) => (
                      <Card key={recognition.id} className="shadow-medium">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                                {recognition.from[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">{recognition.from}</span>
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${categoryColors[recognition.category] || 'bg-gray-100 text-gray-800'}`}
                                >
                                  {recognition.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">• {recognition.timeAgo}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                recognized <span className="font-medium">{recognition.to}</span> for <strong>{recognition.skill}</strong>
                              </p>
                              <p className="text-sm mb-3 italic">“{recognition.message}”</p>
                              <div className="flex gap-1 flex-wrap">
                                {recognition.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Star className="w-5 h-5 text-yellow-400" />
                          </div>

                          {status === "pending" && (
                            <div className="flex justify-end gap-2 pt-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(recognition.id, "accepted")}
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusChange(recognition.id, "rejected")}
                              >
                                Reject
                              </Button>
                            </div>
                          )}

                          {status === "rejected" && (
                            <div className="flex justify-end pt-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(recognition.id, "accepted")}
                              >
                                Move to Accepted
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
