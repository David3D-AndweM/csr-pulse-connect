
import { Layout } from "@/components/layout/Layout";
import { mockReports, mockProjects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown,
  Download, 
  FileText,
  Plus, 
  Search 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Reports() {
  // Combine reports with project data
  const reportsWithProjects = mockReports.map(report => {
    const project = mockProjects.find(p => p.id === report.projectId);
    return {
      ...report,
      project: project?.title || "Unknown Project"
    };
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-none">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-none">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-none">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-none">{status}</Badge>;
    }
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Manage and review project reports</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-200">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button className="bg-csr-primary hover:bg-csr-dark">
            <Plus className="h-4 w-4 mr-2" /> Submit Report
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8 bg-white"
              />
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="text-gray-600">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="text-gray-600">
                Date Range <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Project</th>
                <th className="px-6 py-3">Summary</th>
                <th className="px-6 py-3">Date Submitted</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportsWithProjects.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    #{report.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-csr-light flex items-center justify-center">
                        <FileText className="h-4 w-4 text-csr-primary" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{report.project}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {report.summary.substring(0, 40)}...
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(report.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(report.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-xs h-8">View</Button>
                      <Button variant="ghost" size="sm" className="text-xs h-8">Download</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
          Showing {reportsWithProjects.length} reports
        </div>
      </div>
    </Layout>
  );
}
