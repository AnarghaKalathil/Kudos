import { useState } from "react";
import { Star, Search, Plus, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  stars: number;
  skills: string[];
  email: string;
  initials: string;
  level: number;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Alice Chen",
    role: "Senior Frontend Developer",
    department: "Engineering",
    stars: 42,
    skills: ["React", "TypeScript", "UI/UX", "Performance"],
    email: "alice.chen@company.com",
    initials: "AC",
    level: 5
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Backend Engineer",
    department: "Engineering",
    stars: 38,
    skills: ["Node.js", "API Design", "Database", "DevOps"],
    email: "bob.smith@company.com",
    initials: "BS",
    level: 4
  },
  {
    id: "3",
    name: "Charlie Kim",
    role: "Product Manager",
    department: "Product",
    stars: 35,
    skills: ["Strategy", "Analytics", "User Research", "Agile"],
    email: "charlie.kim@company.com",
    initials: "CK",
    level: 4
  },
  {
    id: "4",
    name: "Diana Lee",
    role: "UX Designer",
    department: "Design",
    stars: 29,
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    email: "diana.lee@company.com",
    initials: "DL",
    level: 3
  },
  {
    id: "5",
    name: "Eve Wilson",
    role: "DevOps Engineer",
    department: "Engineering",
    stars: 31,
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    email: "eve.wilson@company.com",
    initials: "EW",
    level: 4
  },
  {
    id: "6",
    name: "Frank Davis",
    role: "Data Scientist",
    department: "Analytics",
    stars: 22,
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    email: "frank.davis@company.com",
    initials: "FD",
    level: 3
  }
];

export const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const departments = ["all", ...new Set(mockEmployees.map(emp => emp.department))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Employee Directory</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Find and recognize your teammates</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, role, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border rounded-md bg-card text-foreground text-sm sm:text-base min-w-0 sm:min-w-[160px]"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {employee.department}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {employee.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {employee.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{employee.skills.length - 3} more
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 text-xs sm:text-sm">
                  <Plus className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Give </span>Star
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredEmployees.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No employees found matching your search criteria.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};