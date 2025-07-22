import { useState,useEffect } from "react";
import { Star, Send, User, Tag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { getTeamsAPI, getCategoriesAPI, giveRecognitionAPI } from "@/lib/api";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  initials: string;
}

type Props = {
  selectedEmployee: Employee | null;
}

// const mockEmployees: Employee[] = [
//   { id: "1", name: "Alice Chen", role: "Senior Frontend Developer", department: "Engineering", initials: "AC" },
//   { id: "2", name: "Bob Smith", role: "Backend Engineer", department: "Engineering", initials: "BS" },
//   { id: "3", name: "Charlie Kim", role: "Product Manager", department: "Product", initials: "CK" },
//   { id: "4", name: "Diana Lee", role: "UX Designer", department: "Design", initials: "DL" },
//   { id: "5", name: "Eve Wilson", role: "DevOps Engineer", department: "Engineering", initials: "EW" },
//   { id: "6", name: "Frank Davis", role: "Data Scientist", department: "Analytics", initials: "FD" }
// ];

const categories = [
  "Mentoring",
  "Problem Solving",
  "Knowledge Sharing",
  "Collaboration",
  "Innovation",
  "Leadership",
  "Support",
  "Technical Excellence"
];

const suggestedTags = [
  "React", "TypeScript", "Node.js", "API Design", "UI/UX", "Performance",
  "Docker", "Kubernetes", "CI/CD", "AWS", "Database", "DevOps",
  "Analytics", "Data Science", "Machine Learning", "Python",
  "Figma", "Design Systems", "User Research", "Prototyping"
];


interface GiveRecognitionProps {
  selectedEmployee: { id: string; name: string } | null;
  isFromGiveStar: boolean;
}

export const GiveRecognition = ({ selectedEmployee,isFromGiveStar }: GiveRecognitionProps) => {
  
  const [selectedEmployees, setSelectedEmployees] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [reviewer, setReviewer] = useState<string>("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const { toast } = useToast();

useEffect(() => {
  getTeamsAPI().then((data) => {
    if (Array.isArray(data)) setEmployees(data);
  });
  getCategoriesAPI().then((data) => {
    if (Array.isArray(data)) setCategories(data);
  });
}, []);


  useEffect(() => {
    if (isFromGiveStar && selectedEmployee?.id) {
      setSelectedEmployees(selectedEmployee.id);
    }
  }, [selectedEmployee, isFromGiveStar]);


  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployees || !category || !message || !reviewer || tags.length === 0) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit recognition.",
        variant: "destructive"
      });
      return;
    }
    try {
      // Find integer IDs for receiver, category, reviewer
      const receiverId = parseInt(selectedEmployees);
      const categoryId = parseInt(category);
      const reviewerId = parseInt(reviewer);
      const sender = JSON.parse(localStorage.getItem('user') || '{}').user_id;
      // For skills, you may need to map tag names to IDs if available
      const response = await giveRecognitionAPI({
        sender,
        receiver: receiverId,
        category: categoryId,
        message,
        skills: [], // TODO: map tags to skill IDs if available
        reviewer: reviewerId,
      });
      if (response.success) {
        toast({
          title: "Recognition sent for review!",
          description: response.message,
        });
        setSelectedEmployees("");
        setCategory("");
        setMessage("");
        setTags([]);
        setNewTag("");
        setReviewer("");
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const selectedEmployeeData = employees.find(emp => emp.id === parseInt(selectedEmployees));

  return (
    <div className="max-w-2xl mx-auto space-y-8 px-4 sm:px-0 mt-10">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-extrabold text-foreground mb-1">Give Recognition</h2>
        <p className="text-lg text-muted-foreground">Recognize a teammate's contribution and expertise</p>
      </div>

      <Card className="shadow-xl bg-white/80 backdrop-blur rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <Star className="w-6 h-6 text-star" /> Recognition Details
          </CardTitle>
          <CardDescription className="text-base">Select a teammate and describe how they helped you</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Employee Selection */}
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">Who are you recognizing?</label>
              <Select value={selectedEmployees} onValueChange={setSelectedEmployees}>
                <SelectTrigger className="rounded-lg shadow bg-background/80">
                  <SelectValue placeholder="Select a teammate" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(employee => (
                    <SelectItem key={employee.id} value={employee.id}>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 shadow border-2 border-primary/30">
                          <AvatarFallback className="bg-primary text-primary-foreground text-base font-bold">
                            {employee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.role}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedEmployeeData && (
                <div className="flex items-center gap-3 p-3 bg-secondary/40 rounded-xl mt-2 shadow-inner">
                  <Avatar className="w-8 h-8 border-2 border-primary/30">
                    <AvatarFallback className="bg-primary text-primary-foreground text-base font-bold">
                      {selectedEmployeeData.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{selectedEmployeeData.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedEmployeeData.role}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="rounded-lg shadow bg-background/80">
                  <SelectValue placeholder="Select recognition category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">Skills & Tags</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Add a tag (e.g., React, API Design)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag(newTag);
                    }
                  }}
                  className="flex-1 rounded-lg shadow bg-background/80"
                />
                <Button type="button" variant="outline" onClick={() => handleAddTag(newTag)} className="sm:w-auto rounded-lg">
                  <Tag className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              {/* Suggested Tags */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Popular tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.slice(0, 8).map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground transition"
                      onClick={() => handleAddTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* Selected Tags */}
              {tags.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Selected tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer rounded-full px-3 py-1"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">Recognition Message</label>
              <Textarea
                placeholder="Describe how this person helped you and what you learned from them..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="rounded-lg shadow bg-background/80"
              />
            </div>

            {/* Reviewer Selection */}
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">Send to Reviewer</label>
              <Select value={reviewer} onValueChange={setReviewer}>
                <SelectTrigger className="rounded-lg shadow bg-background/80">
                  <SelectValue placeholder="Select reviewer" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(employee => (
                    <SelectItem key={employee.id} value={employee.id}>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 shadow border-2 border-primary/30">
                          <AvatarFallback className="bg-primary text-primary-foreground text-base font-bold">
                            {employee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.role}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
              <Send className="w-5 h-5 mr-2" /> Send Recognition for Review
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};