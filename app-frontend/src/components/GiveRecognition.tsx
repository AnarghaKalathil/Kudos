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
import { getTeamsAPI, getCategoriesAPI, giveRecognitionAPI, getSkillsAPI } from "@/lib/api";

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



interface GiveRecognitionProps {
  selectedEmployee: { id: string; name: string } | null;
  isFromGiveStar: boolean;
}

export const GiveRecognition = ({ selectedEmployee,isFromGiveStar }: GiveRecognitionProps) => {
  
  const [selectedEmployees, setSelectedEmployees] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [reviewer, setReviewer] = useState<string>("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  const { toast } = useToast();

useEffect(() => {
  getTeamsAPI().then((response) => {
    if (response && response.status && Array.isArray(response.data)) {
      setEmployees(response.data.map((emp: any) => ({
        id: emp.user_id,
        name: emp.name,
        role: emp.role || '',
        department: emp.department || '',
        initials: emp.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || '',
      })));
    }
  });
  getCategoriesAPI().then((response) => {
    if (response && response.status && Array.isArray(response.data)) {
      setCategories(response.data.map((cat: any) => ({
        id: cat.id,
        name: cat.name
      })));
    }
  });
  getSkillsAPI().then((response) => {
    if (response && response.status && Array.isArray(response.data)) {
      setSkills(response.data);
    }
  });
}, []);


  useEffect(() => {
    if (isFromGiveStar && selectedEmployee?.id) {
      setSelectedEmployees(selectedEmployee.id);
    }
  }, [selectedEmployee, isFromGiveStar]);

  // Ensure dropdown is prefilled after employees are loaded
  useEffect(() => {
    if (
      isFromGiveStar &&
      selectedEmployee?.id &&
      employees.some(emp => emp.id.toString() === selectedEmployee.id.toString())
    ) {
      setSelectedEmployees(selectedEmployee.id);
    }
  }, [employees, selectedEmployee, isFromGiveStar]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployees || !category || !message || !reviewer || !selectedSkill) {
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
      // Use selected skill IDs
      const skillIds = selectedSkill ? [parseInt(selectedSkill)] : [];
      const response = await giveRecognitionAPI({
        sender,
        receiver: receiverId,
        category: categoryId,
        message,
        skills: skillIds,
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
        setSelectedSkill("");
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
  const userId = JSON.parse(localStorage.getItem('user') || '{}').user_id;
  const filteredEmployees = employees.filter(emp => emp.id.toString() !== userId?.toString());

  // Add a key to the form to force remount when selectedEmployee changes
  const formKey = selectedEmployee?.id || 'default';

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
          <form key={formKey} onSubmit={handleSubmit} className="space-y-8">
            {/* Employee Selection */}
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">Who are you recognizing?</label>
              <Select value={selectedEmployees} onValueChange={setSelectedEmployees}>
                <SelectTrigger className="rounded-lg shadow bg-background/80">
                  <SelectValue placeholder="Select a teammate" />
                </SelectTrigger>
                <SelectContent>
                  {filteredEmployees.map(employee => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8   bg-primary text-sm text-white">
                          <AvatarFallback className="bg-primary text-white foreground text-xsm font-bold">
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
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8   bg-primary text-sm text-white">
                          <AvatarFallback className="bg-primary text-white foreground text-xsm font-bold">
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
                    <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Skills Dropdown */}
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">Skills</label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="rounded-lg shadow bg-background/80">
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map((skill: any) => (
                    <SelectItem key={skill.id} value={skill.id.toString()}>{skill.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  {filteredEmployees.map(employee => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8   bg-primary text-sm text-white">
                          <AvatarFallback className="bg-primary text-white foreground text-xsm font-bold">
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