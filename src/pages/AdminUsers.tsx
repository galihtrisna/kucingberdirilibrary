import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  UserCheck,
  UserX,
  Shield,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
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
      role: "member",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-20",
      booksUploaded: 3,
      booksBorrowed: 25,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "librarian",
      status: "active",
      joinDate: "2023-12-15",
      lastLogin: "2024-01-19",
      booksUploaded: 12,
      booksBorrowed: 45,
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@email.com",
      role: "member",
      status: "suspended",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-18",
      booksUploaded: 0,
      booksBorrowed: 8,
    },
  ];

  const handlePromoteUser = (userId: number) => {
    toast({
      title: "Pengguna Dipromosikan",
      description: `Pengguna ${userId} telah dipromosikan ke peran pustakawan. (Aksi Mock)`,
    });
  };

  const handleSuspendUser = (userId: number) => {
    toast({
      title: "Pengguna Ditangguhkan",
      description: `Akun pengguna ${userId} telah ditangguhkan. (Aksi Mock)`,
      variant: "destructive",
    });
  };

  const handleActivateUser = (userId: number) => {
    toast({
      title: "Pengguna Diaktifkan",
      description: `Akun pengguna ${userId} telah diaktifkan kembali. (Aksi Mock)`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "Pengguna Dihapus",
      description: `Akun pengguna ${userId} telah dihapus secara permanen. (Aksi Mock)`,
      variant: "destructive",
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "librarian":
        return (
          <Badge className="bg-purple-100 text-purple-800">Pustakawan</Badge>
        );
      case "member":
        return <Badge className="bg-gray-100 text-gray-800">Anggota</Badge>;
      default:
        return <Badge variant="secondary">Tidak Diketahui</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Ditangguhkan</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Tidak Aktif</Badge>;
      default:
        return <Badge variant="secondary">Tidak Diketahui</Badge>;
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Kelola Pengguna
        </h1>
        <p className="text-xl text-gray-600">
          Pantau dan kelola akun serta izin pengguna
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Saring Pengguna</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari berdasarkan nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Saring berdasarkan peran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Peran</SelectItem>
                <SelectItem value="librarian">Pustakawan</SelectItem>
                <SelectItem value="member">Anggota</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-3">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="space-y-1">
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.status)}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-600">
                    Bergabung: {user.joinDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    Login terakhir: {user.lastLogin}
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-600">
                    Diunggah: {user.booksUploaded}
                  </p>
                  <p className="text-sm text-gray-600">
                    Dipinjam: {user.booksBorrowed}
                  </p>
                </div>

                <div className="lg:col-span-3">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Lihat
                    </Button>

                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>

                    {user.role === "member" && user.status === "active" && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handlePromoteUser(user.id)}
                      >
                        <Shield className="h-4 w-4 mr-1" />
                        Promosikan
                      </Button>
                    )}

                    {user.status === "active" ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleSuspendUser(user.id)}
                      >
                        <UserX className="h-4 w-4 mr-1" />
                        Tangguhkan
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleActivateUser(user.id)}
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Aktifkan
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Hapus
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
            <p className="text-gray-500 text-lg">
              Tidak ada pengguna yang ditemukan sesuai filter Anda.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUsers;
