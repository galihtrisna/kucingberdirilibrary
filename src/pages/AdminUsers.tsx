
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserCheck, UserX, Shield, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-20",
      booksUploaded: 3,
      booksDownloaded: 25
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "contributor",
      status: "active",
      joinDate: "2023-12-15",
      lastLogin: "2024-01-19",
      booksUploaded: 12,
      booksDownloaded: 45
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@email.com",
      role: "user",
      status: "suspended",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-18",
      booksUploaded: 0,
      booksDownloaded: 8
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      role: "admin",
      status: "active",
      joinDate: "2023-11-20",
      lastLogin: "2024-01-20",
      booksUploaded: 8,
      booksDownloaded: 120
    }
  ];

  const handlePromoteUser = (userId: number) => {
    toast({
      title: "User Promoted",
      description: "User has been promoted to contributor role.",
    });
  };

  const handleSuspendUser = (userId: number) => {
    toast({
      title: "User Suspended",
      description: "User account has been suspended.",
      variant: "destructive"
    });
  };

  const handleActivateUser = (userId: number) => {
    toast({
      title: "User Activated",
      description: "User account has been reactivated.",
    });
  };

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "User Deleted",
      description: "User account has been permanently deleted.",
      variant: "destructive"
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      case "contributor":
        return <Badge className="bg-blue-100 text-blue-800">Contributor</Badge>;
      case "user":
        return <Badge className="bg-gray-100 text-gray-800">User</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Manage Users</h1>
        <p className="text-xl text-gray-600">
          Monitor and manage user accounts and permissions
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-3">
                  <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="space-y-1">
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.status)}
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-600">Joined: {user.joinDate}</p>
                  <p className="text-sm text-gray-600">Last login: {user.lastLogin}</p>
                </div>
                
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-600">Uploaded: {user.booksUploaded}</p>
                  <p className="text-sm text-gray-600">Downloaded: {user.booksDownloaded}</p>
                </div>
                
                <div className="lg:col-span-3">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    
                    {user.role === "user" && user.status === "active" && (
                      <Button 
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handlePromoteUser(user.id)}
                      >
                        <Shield className="h-4 w-4 mr-1" />
                        Promote
                      </Button>
                    )}
                    
                    {user.status === "active" ? (
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleSuspendUser(user.id)}
                      >
                        <UserX className="h-4 w-4 mr-1" />
                        Suspend
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleActivateUser(user.id)}
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Activate
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 text-lg">No users found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUsers;
