
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { mouService } from "@/services/mou.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export function MOUList() {
  const { data: mous = [], isLoading } = useQuery({
    queryKey: ["mous"],
    queryFn: () => mouService.getMOUs(),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-800 hover:bg-green-200",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    expired: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border p-4">
        <Skeleton className="h-10 w-full mb-4" />
        {[...Array(5)].map((_, idx) => (
          <Skeleton key={idx} className="h-12 w-full mb-3" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border">
      {mous.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mous.map((mou) => (
              <TableRow key={mou.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{mou.title}</TableCell>
                <TableCell>{mou.organizationName}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusStyles[mou.status] || ""}
                  >
                    {mou.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(mou.startDate)}</TableCell>
                <TableCell>{formatDate(mou.endDate)}</TableCell>
                <TableCell>{mou.projectIds.length}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/mous/${mou.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="p-6 text-center">
          <h3 className="text-lg font-medium mb-2">No MOUs Found</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first Memorandum of Understanding.
          </p>
          <Link to="/mous/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Create MOU
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
