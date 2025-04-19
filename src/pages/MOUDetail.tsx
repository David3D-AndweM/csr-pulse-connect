
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Edit,
  Trash2,
  Building,
  FileText,
  Link as LinkIcon
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { mouService } from "@/services/mou.service";
import { projectService } from "@/services/project.service";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Link } from "react-router-dom";

const statusColors: Record<string, string> = {
  'active': 'bg-green-100 text-green-800',
  'pending': 'bg-amber-100 text-amber-800',
  'expired': 'bg-red-100 text-red-800',
};

export default function MOUDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: mou, isLoading: isLoadingMOU } = useQuery({
    queryKey: ["mou", id],
    queryFn: () => mouService.getMOUById(id!),
    enabled: !!id,
  });
  
  // Fetch associated projects
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
    enabled: !!mou,
  });
  
  // Filter projects associated with this MOU
  const relatedProjects = mou ? projects.filter(project => project.mouId === mou.id) : [];

  const handleDelete = async () => {
    if (!id) return;
    
    const success = await mouService.deleteMOU(id);
    if (success) {
      navigate("/mous");
    }
    setShowDeleteDialog(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isLoading = isLoadingMOU || isLoadingProjects;

  if (isLoading) {
    return (
      <Layout>
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Skeleton className="h-64 mb-6" />
            <Skeleton className="h-40" />
          </div>
          <div>
            <Skeleton className="h-80" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!mou) {
    return (
      <Layout>
        <div className="py-12 text-center">
          <h2 className="text-2xl font-semibold mb-2">MOU Not Found</h2>
          <p className="text-muted-foreground mb-6">The MOU you are looking for does not exist or has been deleted.</p>
          <Button onClick={() => navigate("/mous")}>Return to MOUs</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/mous">MOUs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{mou.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{mou.title}</h1>
            <Badge className={`${statusColors[mou.status]}`}>
              {mou.status.charAt(0).toUpperCase() + mou.status.slice(1)}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            <Building className="h-4 w-4 inline mr-1" />
            {mou.organizationName}
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => navigate(`/mous/${id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" /> Edit MOU
          </Button>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{mou.description}</p>
          </div>
          
          {/* Associated Projects */}
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Associated Projects</h2>
              <Link to="/projects/new" className="text-sm text-csr-primary hover:underline">
                Add Project
              </Link>
            </div>
            
            {relatedProjects.length > 0 ? (
              <div className="space-y-4">
                {relatedProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed rounded-lg">
                <p className="text-muted-foreground mb-4">No projects are currently associated with this MOU.</p>
                <Link to="/projects/new">
                  <Button size="sm">Create Project</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* MOU Details */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">MOU Details</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Validity Period</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(mou.startDate)} - {formatDate(mou.endDate)}
                  </p>
                </div>
              </div>
              
              {mou.documentUrl && (
                <div className="flex gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Document</p>
                    <a 
                      href={mou.documentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-blue-500 hover:underline flex items-center"
                    >
                      View Document
                      <LinkIcon className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                <FileText className="h-4 w-4 mr-2" /> Generate Report
              </Button>
              <Button className="w-full" variant="outline">
                <LinkIcon className="h-4 w-4 mr-2" /> Upload Document
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this MOU?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the Memorandum of Understanding and may affect associated projects.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
