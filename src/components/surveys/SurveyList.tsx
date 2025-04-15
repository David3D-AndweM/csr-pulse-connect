
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockSurveys } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { BarChart2, Eye, FileSpreadsheet } from "lucide-react";

export function SurveyList() {
  return (
    <div className="bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Survey Name</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Responses</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSurveys.map((survey) => (
            <TableRow key={survey.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{survey.title}</TableCell>
              <TableCell>{survey.projectName}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    survey.status === "active"
                      ? "secondary"
                      : survey.status === "draft"
                      ? "outline"
                      : "default"
                  }
                  className={
                    survey.status === "active"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : survey.status === "draft"
                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }
                >
                  {survey.status}
                </Badge>
              </TableCell>
              <TableCell>{survey.responseCount}/{survey.recipientCount}</TableCell>
              <TableCell>{survey.createdAt}</TableCell>
              <TableCell>{survey.expiresAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <BarChart2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileSpreadsheet className="h-4 w-4" />
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
