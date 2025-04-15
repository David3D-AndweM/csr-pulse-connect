
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockRequests } from "@/data/mockData";

export function RequestList() {
  return (
    <div className="bg-card rounded-lg border">
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
          {mockRequests.map((request) => (
            <TableRow key={request.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">#{request.id}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.requester}</TableCell>
              <TableCell>{request.facility}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.status === "approved"
                      ? "success"
                      : request.status === "pending"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>{request.submittedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
