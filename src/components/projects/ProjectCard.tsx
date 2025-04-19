
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CSRProject } from "@/types";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: CSRProject;
}

const statusColors: Record<string, string> = {
  'planned': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  'completed': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const statusColor = statusColors[project.status] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
          <Badge className={statusColor} variant="outline">
            {project.status.replace('-', ' ')}
          </Badge>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{project.location}</span>
          <span className="mx-2">•</span>
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>
            {formatDate(project.startDate)} - {formatDate(project.endDate)}
          </span>
        </div>
        
        <div className="bg-gray-100 rounded-full h-2 mb-3">
          <div 
            className="bg-csr-primary h-2 rounded-full" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <span className="font-medium">{project.progress}%</span> completed
          </div>
          <div className="flex -space-x-2">
            {project.assignedUsers.slice(0, 3).map((user, idx) => (
              <div
                key={idx}
                className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 ring-2 ring-white overflow-hidden"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
            ))}
            {project.assignedUsers.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 ring-2 ring-white">
                +{project.assignedUsers.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 grid grid-cols-2 divide-x">
        <Link to={`/projects/${project.id}`}>
          <Button variant="ghost" className="py-2 px-4 text-xs font-medium rounded-none text-csr-primary hover:text-csr-primary hover:bg-csr-light w-full">
            View Details
          </Button>
        </Link>
        <Link to={`/projects/${project.id}/edit`}>
          <Button variant="ghost" className="py-2 px-4 text-xs font-medium rounded-none text-csr-primary hover:text-csr-primary hover:bg-csr-light w-full">
            Update Status
          </Button>
        </Link>
      </div>
    </div>
  );
}
