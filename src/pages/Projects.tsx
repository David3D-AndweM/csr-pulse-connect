
import { Layout } from "@/components/layout/Layout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  Plus,
  Search,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
  });

  // Extract unique categories from projects
  const categories = [...new Set(projects.map(project => project.category))];
  
  // Apply filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? project.status === statusFilter : true;
    const matchesCategory = categoryFilter ? project.category === categoryFilter : true;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleResetFilters = () => {
    setStatusFilter(null);
    setCategoryFilter(null);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track all your CSR initiatives</p>
        </div>
        <Button className="bg-csr-primary hover:bg-csr-dark" onClick={() => navigate("/projects/new")}>
          <Plus className="h-4 w-4 mr-2" /> Create Project
        </Button>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center flex-1 justify-start">
                  <Filter className="h-4 w-4 mr-2" /> 
                  Status: {statusFilter ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) : "All"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("planned")}>
                    Planned
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center flex-1 justify-start">
                  Category: {categoryFilter || "All"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {categories.map(category => (
                    <DropdownMenuItem 
                      key={category} 
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center space-x-2">
            {(statusFilter || categoryFilter) && (
              <>
                <div className="text-sm text-gray-500">Active Filters:</div>
                {statusFilter && (
                  <Badge variant="secondary" className="text-xs bg-csr-light text-csr-primary">
                    {statusFilter}
                    <button 
                      className="ml-1 hover:text-red-500"
                      onClick={() => setStatusFilter(null)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {categoryFilter && (
                  <Badge variant="secondary" className="text-xs bg-csr-light text-csr-primary">
                    {categoryFilter}
                    <button 
                      className="ml-1 hover:text-red-500"
                      onClick={() => setCategoryFilter(null)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={handleResetFilters}
                >
                  Clear All
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          {searchTerm || statusFilter || categoryFilter ? (
            <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
          ) : (
            <p className="text-muted-foreground mb-4">Get started by creating your first project</p>
          )}
          <Button 
            onClick={() => navigate("/projects/new")}
            className="bg-csr-primary hover:bg-csr-dark"
          >
            <Plus className="h-4 w-4 mr-2" /> Create Project
          </Button>
        </div>
      )}
    </Layout>
  );
}
