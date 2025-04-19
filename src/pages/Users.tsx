
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, UserPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getUsers(),
  });
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container py-4">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
        
        <Card>
          {isLoading ? (
            <CardContent className="p-6">
              <Skeleton className="h-8 w-full mb-4" />
              {[...Array(5)].map((_, idx) => (
                <Skeleton key={idx} className="h-12 w-full mb-3" />
              ))}
            </CardContent>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <img 
                              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                              alt={user.name}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            {user.name}
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {'Active'} {/* Default status since it doesn't exist in User type */}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Disable</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">
                        <p className="text-muted-foreground">No users found matching your search criteria</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </Card>
      </div>
    </Layout>
  );
}
