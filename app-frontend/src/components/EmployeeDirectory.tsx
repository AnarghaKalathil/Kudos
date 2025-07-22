import { useEffect, useState } from "react";
import { Search, Plus,Star} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getTeamsAPI } from "@/lib/api";

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

export const EmployeeDirectory = ({ onGiveStar }: EmployeeDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getTeamsAPI().then((data) => {
      if (Array.isArray(data)) setEmployees(data);
    });
  }, []);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.skills || []).some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const employeesPerPage = 6;
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="space-y-10 min-h-screen flex flex-col">
      <div className="flex flex-col gap-6 mb-2 mt-10">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-1">Employee Directory</h2>
          <p className="text-lg text-muted-foreground">Find and recognize your teammates</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, role, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 rounded-lg shadow bg-background/80 text-base"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {currentEmployees.map((employee) => (
          <div className="flex flex-col h-full">
            <Card key={employee.id} className="flex flex-col flex-1 shadow-xl bg-white/80 backdrop-blur rounded-2xl hover:scale-[1.02] transition-transform h-full min-h-[240px]">
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
                <div className="flex flex-wrap gap-2">
                  {employee.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="rounded-full px-3 py-1 text-sm font-medium">
                      {skill}
                    </Badge>
                  ))}
                  {employee.skills.length > 3 && (
                    <Badge variant="outline" className="rounded-full px-3 py-1 text-sm font-medium">
                      +{employee.skills.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <Button size="sm" className="flex-1 text-base font-semibold rounded-lg bg-gradient-to-r from-primary to-accent text-white shadow hover:scale-105 transition-transform" onClick={() => onGiveStar(employee)}>
                    <Star className="w-4 h-4 mr-1" /> Recognize
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg px-4 py-2"
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
                className={`rounded-lg px-4 py-2 ${currentPage === page ? 'bg-primary text-white' : ''}`}
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
            className="rounded-lg px-4 py-2"
          >
            Next
          </Button>
        </div>
      )}
      {filteredEmployees.length === 0 && (
        <Card className="text-center py-12 bg-white/80 rounded-2xl shadow-xl">
          <CardContent>
            <div className="text-muted-foreground">
              <Search className="w-16 h-16 mx-auto mb-6 opacity-50" />
              <p className="text-lg font-semibold">No employees found matching your search criteria.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};