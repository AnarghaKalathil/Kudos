import { useEffect, useState } from "react";
import { Search, Filter, Star, MessageCircle, Trophy,User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getTeamsAPI, getSkillsAPI } from "@/lib/api";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  stars: number;
  skills: string[];
  recognitions: Array<{
    skill: string;
    count: number;
    category: string;
  }>;
  email: string;
  initials: string;
}

interface TagSearchProps {
  onGiveStar: (employee: Employee) => void;
}

export const TagSearch = ({ onGiveStar }: TagSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("any-skill");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [minStars, setMinStars] = useState("0");
   const [viewingEmployee, setViewingEmployee] = useState(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedDesignation, setSelectedDesignation] = useState("all");

  useEffect(() => {
    getTeamsAPI().then((response) => {
      if (response && response.status && Array.isArray(response.data)) {
        // Map backend fields to Employee interface
        const mapped = response.data.map((emp: any) => ({
          id: emp.user_id,
          name: emp.name,
          role: emp.role || '',
          department: emp.department || '',
          stars: emp.star_count || 0,
          skills: emp.skills || [],
          recognitions: emp.recognitions || [],
          email: emp.email,
          initials: emp.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || '',
        }));
        setEmployees(mapped);
      }
    });
    getSkillsAPI().then((response) => {
      if (response && response.status && Array.isArray(response.data)) {
        setSkills(response.data.map((skill: any) => skill.name));
      }
    });
  }, []);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.skills || []).some(skill => {
        if (skill == null) return false;
        const skillName = typeof skill === 'object' ? skill.name : skill;
        return skillName && skillName.toLowerCase().includes(searchTerm.toLowerCase());
      });

    const matchesSkill = selectedSkill === "any-skill" || (employee.skills || []).some(skill => {
      if (skill == null) return false;
      const skillName = typeof skill === 'object' ? skill.name : skill;
      return skillName === selectedSkill;
    });
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
    const matchesDesignation = selectedDesignation === "all" || employee.role === selectedDesignation;
    const matchesMinStars = employee.stars >= (parseInt(minStars) || 0);

    return matchesSearch && matchesSkill && matchesDepartment && matchesDesignation && matchesMinStars;
  });

  const getSkillExpertise = (employee: Employee, skill: string) => {
    const recognition = employee.recognitions.find(r => r.skill === skill);
    return recognition ? recognition.count : 0;
  };

  const departments = ["all", ...new Set(employees.map(emp => emp.department))];
  const designations = ["all", ...new Set(employees.map(emp => emp.role).filter(Boolean))];

  const popularSkills = skills.slice(0, 8);

  // Color palette for random badge colors
  const badgeColors = [
    'bg-primary/10 text-primary',
    'bg-accent/10 text-accent',
    'bg-info/10 text-info',
    'bg-warning/10 text-warning',
    'bg-success/10 text-success',
    'bg-destructive/10 text-destructive',
    'bg-secondary/20 text-secondary-foreground',
    'bg-muted/10 text-muted-foreground',
  ];

  function getRandomBadgeColor(key: string) {
    // Simple hash for consistent color per skill
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % badgeColors.length;
    return badgeColors[idx];
  }

  return (
    <div className="space-y-10 mt-10">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-extrabold text-foreground mb-1">Find Experts</h2>
        <p className="text-lg text-muted-foreground">Search for teammates by skills and expertise</p>
      </div>
      <Card className="shadow-xl bg-white/80 backdrop-blur rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <Search className="w-6 h-6" /> Search Filters
          </CardTitle>
          <CardDescription className="text-base">Find the right person for your project or question</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Name, role, or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 rounded-lg shadow bg-background/80 text-base"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground">Skill</label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="rounded-lg shadow bg-background/80">
                  <SelectValue placeholder="Any skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-skill">Any skill</SelectItem>
                  {skills.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>
        </CardContent>
      </Card>
      <Card className="shadow-xl bg-white/80 backdrop-blur rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Popular Skills</CardTitle>
          <CardDescription className="text-base">Click on a skill to find experts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {popularSkills.map(skill => {
              const expertCount = employees.filter(emp => (emp.skills || []).includes(skill)).length;
              return (
                <Badge
                  key={skill}
                  variant={selectedSkill === skill ? "default" : "outline"}
                  className="cursor-pointer rounded-full px-3 py-1 text-base font-medium hover:bg-primary hover:text-primary-foreground transition"
                  onClick={() => setSelectedSkill(selectedSkill === skill ? "any-skill" : skill)}
                >
                  {skill} ({expertCount})
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredEmployees.map((employee) => (
          <div className="flex flex-col h-full">
            <Card key={employee.id} className="flex flex-col flex-1 shadow-xl bg-white/80 backdrop-blur rounded-2xl hover:scale-[1.02] transition-transform h-full min-h-[190px]">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14 border-2 border-primary/30 shadow">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">
                      {employee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold">{employee.name}</CardTitle>
                    <CardDescription className="text-base">{employee.role}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-star" />
                    <span className="font-bold text-star text-lg">{employee.stars}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-end">
                <div className="flex flex-wrap gap-2 mb-2">
                  {(employee.skills || []).map((skill, index) => {
                    if (skill == null) return null;
                    const skillName = typeof skill === 'object' ? skill.name : skill;
                    return (
                      <Badge key={index} variant="outline" className="rounded-full px-3 py-1 text-sm font-medium">
                        {typeof skill === 'object' ? skill.name : skill}
                      </Badge>
                    );
                  })}
                </div>
                <div className="flex gap-40 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 text-base font-semibold rounded-lg bg-gradient-to-r from-primary to-accent text-white shadow hover:scale-105 transition-transform"
                    onClick={() => setViewingEmployee(employee)}
                  >
                    <User className="w-4 h-4 mr-1" /> View Profile
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-base font-semibold rounded-lg hover:bg-primary/10 hover:text-primary transition"
                    onClick={() => onGiveStar(employee)}
                  >
                    <Star className="w-4 h-4 mr-1" /> Recognize
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {viewingEmployee && (
        <Dialog open={!!viewingEmployee} onOpenChange={() => setViewingEmployee(null)}>
         <DialogContent className="max-w-3xl rounded-2xl shadow-xl bg-white/90 backdrop-blur-lg">
            <Card className="shadow-none bg-transparent w-full">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  {/* Avatar */}
                  <Avatar className="w-24 h-24 border-4 border-primary/30 shadow-lg">
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-extrabold">
                      {viewingEmployee.initials}
                    </AvatarFallback>
                  </Avatar>
                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-1">{viewingEmployee.name}</h1>
                    <p className="text-lg sm:text-xl text-muted-foreground font-medium">{viewingEmployee.role}</p>
                    <p className="text-base text-muted-foreground mb-2">{viewingEmployee.department} • {viewingEmployee.email}</p>
                    {/* Stars & Trophy */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 text-star" />
                        <span className="text-2xl sm:text-3xl font-extrabold text-star">{viewingEmployee.star_count ?? viewingEmployee.stars ?? 0}</span>
                        <span className="text-base text-muted-foreground">stars earned</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-warning" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Skills */}
                <div className="mt-8 space-y-2">
                  <h4 className="text-base font-semibold text-foreground">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {(viewingEmployee.skills || []).length === 0 ? (
                      <span className="text-muted-foreground text-sm">No skills listed.</span>
                    ) : (
                      (viewingEmployee.skills || []).map((skill, index) => (
                        <Badge key={index} variant="outline" className="rounded-full px-3 py-1 text-base font-medium">
                          {skill == null ? '' : (typeof skill === 'object' ? skill.name : skill)}
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
                {/* Recognitions */}
                <div className="mt-8 space-y-2">
                  <h4 className="text-base font-semibold text-foreground">Recognitions</h4>
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="font-semibold">Pending:</span> {(viewingEmployee.recognitions?.pending?.length ?? 0)}
                    </div>
                    <div>
                      <span className="font-semibold">Approved:</span> {(viewingEmployee.recognitions?.approved?.length ?? 0)}
                    </div>
                    <div>
                      <span className="font-semibold">Rejected:</span> {(viewingEmployee.recognitions?.rejected?.length ?? 0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      )}
      {filteredEmployees.length === 0 && (
        <Card className="text-center py-12 bg-white/80 rounded-2xl shadow-xl">
          <CardContent>
            <div className="text-muted-foreground">
              <Filter className="w-16 h-16 mx-auto mb-6 opacity-50" />
              <p className="text-lg font-semibold">No experts found matching your criteria.</p>
              <p className="text-base">Try adjusting your search filters.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
