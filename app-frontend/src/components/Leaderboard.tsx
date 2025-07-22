"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Star } from "lucide-react";
import { Dialog, DialogContent, DialogFooter ,DialogOverlay} from "@/components/ui/dialog";
import { changeRecognitionStatusAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Recognition interface
interface Recognition {
  id: string;
  from: string;
  to: string;
  skill: string;
  category: string;
  date: string;
  message: string;
  tags: string[];
  status: "pending" | "accepted" | "rejected";
}

const initialRecognitions: Recognition[] = [
  {
    id: "r1",
    from: "Alice Cheng",
    to: "Bob Smith",
    skill: "React Debug",
    category: "Frontend",
    date: "2 hours ago",
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
    date: "4 hours ago",
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
    date: "1 day ago",
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
    date: "3 days ago",
    message: "Loved the clean responsive UI you built.",
    tags: ["Tailwind", "CSS", "Design"],
    status: "rejected"
  }
];

const categoryColors: Record<string, string> = {
  Frontend: "bg-primary/10 text-primary",
  Backend: "bg-accent/10 text-accent",
  DevOps: "bg-info/10 text-info"
};

type ActionType = "accept" | "reject" | "moveToAccepted" | null;

export default function RecognitionTabs() {
  const [recognitions, setRecognitions] = useState(initialRecognitions);
  const [activeTab, setActiveTab] = useState<"pending" | "accepted" | "rejected">("pending");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecognition, setSelectedRecognition] = useState<Recognition | null>(null);
  const [actionType, setActionType] = useState<ActionType>(null);

  const { toast } = useToast();

  const handleStatusChange = async (id: string, newStatus: Recognition["status"]) => {
    // Call backend API
    const response = await changeRecognitionStatusAPI(Number(id), newStatus.toUpperCase());
    if (!response.success) {
      toast({
        title: "Error",
        description: response.message || "Failed to update status",
        variant: "destructive"
      });
      return;
    }
    setRecognitions((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec))
    );
  };

  const openConfirmation = (recognition: Recognition, action: ActionType) => {
    setSelectedRecognition(recognition);
    setActionType(action);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (!selectedRecognition || !actionType) return;

    if (actionType === "accept") handleStatusChange(selectedRecognition.id, "accepted");
    if (actionType === "reject") handleStatusChange(selectedRecognition.id, "rejected");
    if (actionType === "moveToAccepted") handleStatusChange(selectedRecognition.id, "accepted");

    setModalOpen(false);
    setSelectedRecognition(null);
    setActionType(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6 mt-8">
      <Card className="w-full flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Review Requests</h2>
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
            <TabsContent key={status} value={status} className="p-4 flex-1 overflow-auto">
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
                                  className={`text-xs ${
                                    categoryColors[recognition.category] || "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {recognition.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">• {recognition.date}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                recognized <span className="font-medium">{recognition.to}</span> for{" "}
                                <strong>{recognition.skill}</strong>
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
                                onClick={() => openConfirmation(recognition, "accept")}
                              >
                                Accept
                              </Button>
                              <Button 
                                size="sm"
                                variant="destructive"
                                onClick={() => openConfirmation(recognition, "reject")}
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
                                onClick={() => openConfirmation(recognition, "moveToAccepted")}
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

      {/* Confirmation Modal */}
      <Dialog open={modalOpen} onOpenChange={(open) => !open && setModalOpen(false)}>
        <DialogOverlay className="fixed inset-0 bg-black/10 z-50" />
        <DialogContent className="max-w-md">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold">Confirm Action</h3>
            <p className="text-sm ">
              Are you sure you want to{" "}
              <strong>
                {actionType === "accept"
                  ? "Accept"
                  : actionType === "reject"
                  ? "Reject"
                  : "Move to Accepted"}
              </strong>{" "}
            </p>
          </div>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
