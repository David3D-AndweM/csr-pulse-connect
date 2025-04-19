
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { requestService } from "@/services/request.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export function RequestList() {
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: () => requestService.getRequests(),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
      {requests.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Facility/Support</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow 
                key={request.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => null} // Replace with navigate to detail view when available
              >
                <TableCell className="font-medium">#{request.id.substring(0, 6)}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.requester}</TableCell>
                <TableCell>{request.facility}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "secondary"
                        : request.status === "pending"
                        ? "outline"
                        : "destructive"
                    }
                    className={
                      request.status === "approved"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : request.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : ""
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(request.submittedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="p-6 text-center">
          <h3 className="text-lg font-medium mb-2">No Requests Found</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first facility request.
          </p>
          <Link to="/requests/new">
            <Badge>Create Request</Badge>
          </Link>
        </div>
      )}
    </div>
  );
}
