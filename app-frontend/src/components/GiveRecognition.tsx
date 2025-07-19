import { useState } from "react";
import { Star, Send, User, Tag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  initials: string;
}

const mockEmployees: Employee[] = [
  { id: "1", name: "Alice Chen", role: "Senior Frontend Developer", department: "Engineering", initials: "AC" },
  { id: "2", name: "Bob Smith", role: "Backend Engineer", department: "Engineering", initials: "BS" },
  { id: "3", name: "Charlie Kim", role: "Product Manager", department: "Product", initials: "CK" },
  { id: "4", name: "Diana Lee", role: "UX Designer", department: "Design", initials: "DL" },
  { id: "5", name: "Eve Wilson", role: "DevOps Engineer", department: "Engineering", initials: "EW" },
  { id: "6", name: "Frank Davis", role: "Data Scientist", department: "Analytics", initials: "FD" }
];

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

export const GiveRecognition = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [reviewer, setReviewer] = useState<string>("");
  const { toast } = useToast();

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEmployee || !category || !message || tags.length === 0) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit recognition.",
        variant: "destructive"
      });
      return;
    }

    const employee = mockEmployees.find(emp => emp.id === selectedEmployee);
    
    toast({
      title: "Recognition sent for review!",
      description: `Your recognition for ${employee?.name} has been sent to ${reviewer || "the manager"} for approval.`,
    });

    // Reset form
    setSelectedEmployee("");
    setCategory("");
    setMessage("");
    setTags([]);
    setNewTag("");
    setReviewer("");
  };

  const selectedEmployeeData = mockEmployees.find(emp => emp.id === selectedEmployee);

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Give Recognition</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Recognize a teammate's contribution and expertise</p>
      </div>

      <Card className="bg-gradient-card shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-star" />
            Recognition Details
          </CardTitle>
          <CardDescription>
            Select a teammate and describe how they helped you
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Who are you recognizing?</label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a teammate" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map(employee => (
                    <SelectItem key={employee.id} value={employee.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {employee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.role}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedEmployeeData && (
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedEmployeeData.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedEmployeeData.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedEmployeeData.role}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recognition category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

              {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Skills & Tags</label>
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
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={() => handleAddTag(newTag)} className="sm:w-auto">
                  <Tag className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              
              {/* Suggested Tags */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Popular tags:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestedTags.slice(0, 8).map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
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
                  <div className="flex flex-wrap gap-1">
                    {tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer"
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
              <label className="text-sm font-medium text-foreground">Recognition Message</label>
              <Textarea
                placeholder="Describe how this person helped you and what you learned from them..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            {/* Reviewer Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Send to Reviewer</label>
              <Select value={reviewer} onValueChange={setReviewer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reviewer (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Direct Manager</SelectItem>
                  <SelectItem value="hr">HR Team</SelectItem>
                  <SelectItem value="tech-lead">Tech Lead</SelectItem>
                  <SelectItem value="team-lead">Team Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
              <Send className="w-4 h-4 mr-2" />
              Send Recognition for Review
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Recognition Preview */}
      <Card className="bg-gradient-card shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Recent Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-star" />
                <span className="font-medium">You gave a star to Alice Chen</span>
                <Badge variant="outline" className="text-xs">Pending Review</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                "Alice helped me debug a complex React component issue..."
              </p>
              <div className="flex gap-1 mt-2">
                <Badge variant="outline" className="text-xs">React</Badge>
                <Badge variant="outline" className="text-xs">Debug</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};