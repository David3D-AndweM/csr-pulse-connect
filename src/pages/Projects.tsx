
import { Layout } from "@/components/layout/Layout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { mockProjects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  Plus,
  Search 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track all your CSR initiatives</p>
        </div>
        <Button className="bg-csr-primary hover:bg-csr-dark">
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
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" /> 
              Filter
            </Button>
            <Button variant="outline" className="flex-1 justify-start text-gray-600">
              Status: All
            </Button>
            <Button variant="outline" className="flex-1 justify-start text-gray-600">
              Category: All
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500">Active Filters:</div>
            <Badge variant="secondary" className="text-xs bg-csr-light text-csr-primary">
              In Progress
              <button className="ml-1 hover:text-red-500">×</button>
            </Badge>
            <Badge variant="secondary" className="text-xs bg-csr-light text-csr-primary">
              Environment
              <button className="ml-1 hover:text-red-500">×</button>
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Layout>
  );
}
