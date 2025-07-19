import { useState } from "react";
import { Search, Filter, Star, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Alice Chen",
    role: "Senior Frontend Developer",
    department: "Engineering",
    stars: 42,
    skills: ["React", "TypeScript", "UI/UX", "Performance", "Testing"],
    recognitions: [
      { skill: "React", count: 8, category: "Technical Excellence" },
      { skill: "TypeScript", count: 6, category: "Technical Excellence" },
      { skill: "UI/UX", count: 4, category: "Collaboration" },
      { skill: "Performance", count: 3, category: "Problem Solving" }
    ],
    email: "alice.chen@company.com",
    initials: "AC"
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Backend Engineer",
    department: "Engineering",
    stars: 38,
    skills: ["Node.js", "API Design", "Database", "DevOps", "Security"],
    recognitions: [
      { skill: "Node.js", count: 7, category: "Technical Excellence" },
      { skill: "API Design", count: 5, category: "Technical Excellence" },
      { skill: "Database", count: 4, category: "Problem Solving" },
      { skill: "DevOps", count: 3, category: "Innovation" }
    ],
    email: "bob.smith@company.com",
    initials: "BS"
  },
  {
    id: "3",
    name: "Eve Wilson",
    role: "DevOps Engineer",
    department: "Engineering",
    stars: 31,
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Monitoring"],
    recognitions: [
      { skill: "Docker", count: 6, category: "Technical Excellence" },
      { skill: "Kubernetes", count: 4, category: "Technical Excellence" },
      { skill: "CI/CD", count: 3, category: "Innovation" },
      { skill: "AWS", count: 2, category: "Problem Solving" }
    ],
    email: "eve.wilson@company.com",
    initials: "EW"
  },
  {
    id: "4",
    name: "Diana Lee",
    role: "UX Designer",
    department: "Design",
    stars: 29,
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"],
    recognitions: [
      { skill: "Figma", count: 5, category: "Technical Excellence" },
      { skill: "User Research", count: 4, category: "Knowledge Sharing" },
      { skill: "Prototyping", count: 3, category: "Innovation" },
      { skill: "Design Systems", count: 2, category: "Collaboration" }
    ],
    email: "diana.lee@company.com",
    initials: "DL"
  },
  {
    id: "5",
    name: "Frank Davis",
    role: "Data Scientist",
    department: "Analytics",
    stars: 22,
    skills: ["Python", "Machine Learning", "SQL", "Statistics", "Data Visualization"],
    recognitions: [
      { skill: "Python", count: 4, category: "Technical Excellence" },
      { skill: "Machine Learning", count: 3, category: "Innovation" },
      { skill: "SQL", count: 3, category: "Problem Solving" },
      { skill: "Statistics", count: 2, category: "Knowledge Sharing" }
    ],
    email: "frank.davis@company.com",
    initials: "FD"
  }
];

const allSkills = Array.from(new Set(mockEmployees.flatMap(emp => emp.skills))).sort();

export const TagSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("any-skill");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [minStars, setMinStars] = useState("0");

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSkill = selectedSkill === "any-skill" || employee.skills.includes(selectedSkill);
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
    const matchesMinStars = employee.stars >= (parseInt(minStars) || 0);

    return matchesSearch && matchesSkill && matchesDepartment && matchesMinStars;
  });

  const getSkillExpertise = (employee: Employee, skill: string) => {
    const recognition = employee.recognitions.find(r => r.skill === skill);
    return recognition ? recognition.count : 0;
  };

  const departments = ["all", ...new Set(mockEmployees.map(emp => emp.department))];

  const popularSkills = allSkills.slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Find Experts</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Search for teammates by skills and expertise</p>
      </div>

      <Card className="bg-gradient-card shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Filters
          </CardTitle>
          <CardDescription>
            Find the right person for your project or question
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Name, role, or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Skill</label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Any skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-skill">Any skill</SelectItem>
                  {allSkills.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Any department" />
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Min Stars</label>
              <Select value={minStars} onValueChange={setMinStars}>
                <SelectTrigger>
                  <SelectValue placeholder="Any level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any level</SelectItem>
                  <SelectItem value="10">10+ stars</SelectItem>
                  <SelectItem value="20">20+ stars</SelectItem>
                  <SelectItem value="30">30+ stars</SelectItem>
                  <SelectItem value="40">40+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Popular Skills</CardTitle>
          <CardDescription>Click on a skill to find experts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map(skill => {
              const expertCount = mockEmployees.filter(emp => emp.skills.includes(skill)).length;
              return (
                <Badge
                  key={skill}
                  variant={selectedSkill === skill ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSelectedSkill(selectedSkill === skill ? "any-skill" : skill)}
                >
                  {skill} ({expertCount})
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="bg-gradient-card shadow-medium hover:shadow-large transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {employee.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <CardDescription className="text-sm">{employee.role}</CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-star" />
                  <span className="font-semibold text-star">{employee.stars}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {employee.department}
                </Badge>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Top Skills</h4>
                <div className="space-y-1">
                  {employee.recognitions.slice(0, 3).map((recognition, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{recognition.skill}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-star" />
                        <span className="text-star font-medium">{recognition.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">All Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className={`text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground ${
                        selectedSkill === skill ? 'bg-primary text-primary-foreground' : ''
                      }`}
                      onClick={() => setSelectedSkill(selectedSkill === skill ? "any-skill" : skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 text-xs sm:text-sm">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Ask </span>Question
                </Button>
                <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                  <Star className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Recognize</span>
                </Button>
                <Button size="sm" variant="outline" className="px-2 sm:px-3">
                  <Mail className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="text-center py-8 col-span-full">
          <CardContent>
            <div className="text-muted-foreground">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No experts found matching your criteria.</p>
              <p className="text-sm">Try adjusting your search filters.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
