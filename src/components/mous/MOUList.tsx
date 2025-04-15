
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockMOUs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";

export function MOUList() {
  return (
    <div className="bg-card rounded-lg border">
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
          {mockMOUs.map((mou) => (
            <TableRow key={mou.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{mou.title}</TableCell>
              <TableCell>{mou.organizationName}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    mou.status === "active"
                      ? "secondary"
                      : mou.status === "pending"
                      ? "outline"
                      : "default"
                  }
                  className={
                    mou.status === "active"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : mou.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }
                >
                  {mou.status}
                </Badge>
              </TableCell>
              <TableCell>{mou.startDate}</TableCell>
              <TableCell>{mou.endDate}</TableCell>
              <TableCell>{mou.projectCount}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
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
    </div>
  );
}
