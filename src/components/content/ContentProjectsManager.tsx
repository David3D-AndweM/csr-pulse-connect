
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Edit, Trash, Plus, Search, Filter, Grid3X3, GripVertical, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { mockProjects } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CSRProject } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ContentProjectsManager() {
  const [projects, setProjects] = useState<CSRProject[]>(mockProjects);
  const [featuredProjects, setFeaturedProjects] = useState<string[]>(
    mockProjects.slice(0, 6).map(p => p.id)
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState<CSRProject | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<string>("grid");
  const [sortBy, setSortBy] = useState<string>("recent");

  const handleToggleFeatured = (projectId: string) => {
    if (featuredProjects.includes(projectId)) {
      setFeaturedProjects(featuredProjects.filter(id => id !== projectId));
      toast.success("Project removed from featured list");
    } else {
      if (featuredProjects.length >= 8) {
        toast.warning("Maximum 8 featured projects allowed. Remove one first.");
        return;
      }
      setFeaturedProjects([...featuredProjects, projectId]);
      toast.success("Project added to featured list");
    }
  };

  const handleEditProjectDescription = (project: CSRProject) => {
    setCurrentProject(project);
    setOpenDialog(true);
  };

  const handleSaveProjectDescription = () => {
    if (!currentProject) return;
    
    setProjects(projects.map(project => 
      project.id === currentProject.id ? currentProject : project
    ));
    toast.success("Project description updated");
    setOpenDialog(false);
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort projects based on selected option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "progress":
        return b.progress - a.progress;
      case "budget":
        return b.budget - a.budget;
      case "recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Featured Projects</h2>
        <div className="flex items-center space-x-2">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid3X3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <GripVertical className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-2">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
                Alphabetical
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("progress")}>
                Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("budget")}>
                Budget (High to Low)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" /> 
          Filter
        </Button>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Featured: {featuredProjects.length}/8</h3>
        <div className="flex flex-wrap gap-2">
          {featuredProjects.map(projectId => {
            const project = projects.find(p => p.id === projectId);
            if (!project) return null;
            return (
              <Badge key={projectId} className="cursor-pointer" onClick={() => handleToggleFeatured(projectId)}>
                {project.title} ✕
              </Badge>
            );
          })}
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProjects.map((project) => (
            <Card key={project.id} className={`
              ${featuredProjects.includes(project.id) ? 'ring-2 ring-primary ring-offset-2' : ''}
            `}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                <CardDescription>
                  {project.category} • {new Date(project.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">{project.description}</p>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant={featuredProjects.includes(project.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleFeatured(project.id)}
                >
                  {featuredProjects.includes(project.id) ? 'Featured' : 'Add to Featured'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditProjectDescription(project)}
                >
                  <Edit size={14} className="mr-2" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {sortedProjects.map((project) => (
            <div 
              key={project.id} 
              className={`flex justify-between items-center p-4 border rounded-md
                ${featuredProjects.includes(project.id) ? 'ring-2 ring-primary' : ''}
              `}
            >
              <div className="flex-1">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="mr-2">{project.category}</Badge>
                  <span className="text-xs text-muted-foreground">{project.progress}% Complete</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={featuredProjects.includes(project.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleFeatured(project.id)}
                >
                  {featuredProjects.includes(project.id) ? 'Featured' : 'Feature'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditProjectDescription(project)}
                >
                  <Edit size={14} className="mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Project Description</DialogTitle>
            <DialogDescription>
              Update the description for public display on the website.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-title">Title</Label>
              <Input
                id="project-title"
                value={currentProject?.title || ''}
                disabled
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="project-description">Public Description</Label>
              <Textarea
                id="project-description"
                rows={6}
                value={currentProject?.description || ''}
                onChange={(e) => setCurrentProject(prev => prev ? {...prev, description: e.target.value} : null)}
                placeholder="Write a compelling project description for the public website..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveProjectDescription}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
