import { useState } from "react";
import { Search, Plus,Star} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface EmployeeDirectoryProps {
  onGiveStar: (employee: { id: string; name: string }) => void;
}

interface Employee {
  id: string;
  name: string;
  role: string;
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
    stars: 22,
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    email: "frank.davis@company.com",
    initials: "FD",
    level: 3
  },
    {
    id: "7",
    name: "Xavier",
    role: "Data Scientist",
    stars: 10,
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    email: "frank.davis@company.com",
    initials: "FD",
    level: 3
  },
    {
    id: "8",
    name: "lrank aavis",
    role: "Data Scientist",
    stars: 20,
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    email: "frank.davis@company.com",
    initials: "FD",
    level: 3
  }
];

export const EmployeeDirectory = ({ onGiveStar }: EmployeeDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    
    return matchesSearch 
  });

const employeesPerPage = 6;

const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="space-y-6 min-h-screen flex flex-col">
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
{/*           
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border rounded-md bg-card text-foreground text-sm sm:text-base min-w-0 sm:min-w-[160px]"
          >
          </select> */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {currentEmployees.map((employee) => (
          <div className="flex-grow">
          <Card key={employee.id} className=" shadow-medium hover:shadow-large transition-shadow">
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
                <Button size="sm" className="flex-1 text-xs sm:text-sm" onClick={() => onGiveStar(employee)}>
                  <Star className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Recognize </span>
                </Button>
              </div>
            </CardContent>
          </Card>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
  <div className="flex justify-center items-center gap-1 mt-4">
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </Button>

    {Array.from({ length: totalPages }).map((_, i) => {
      const page = i + 1;
      const isVisible = 
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - 1 && page <= currentPage + 1);

      const isEllipsis =
        (page === currentPage - 2 && page > 2) ||
        (page === currentPage + 2 && page < totalPages - 1);

      if (isEllipsis) {
        return <span key={page} className="px-2 text-muted-foreground">...</span>;
      }

      if (!isVisible) return null;

      return (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => paginate(page)}
          className="px-3"
        >
          {page}
        </Button>
      );
    })}

    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
)}

      
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