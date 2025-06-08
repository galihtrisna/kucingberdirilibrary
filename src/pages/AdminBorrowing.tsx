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
  Download,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
} from "lucide-react";

const AdminBorrowing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const borrowingRecords = [
    {
      id: 1,
      user: "Galih Trisna",
      email: "galih.trisna@email.com",
      book: "Pengantar Ilmu Komputer",
      author: "Dr. Sari Lestari",
      borrowDate: "2024-01-15",
      downloadDate: "2024-01-15",
      status: "downloaded",
      category: "Informatika",
    },
    {
      id: 2,
      user: "Dewi Rahma",
      email: "dewi.rahma@email.com",
      book: "Pemrograman Web Modern",
      author: "Budi Santoso",
      borrowDate: "2024-01-14",
      downloadDate: "2024-01-14",
      status: "downloaded",
      category: "Pemrograman",
    },
    {
      id: 3,
      user: "Aldi Nugraha",
      email: "aldi.nugraha@email.com",
      book: "Panduan Digital Marketing",
      author: "Rina Kurnia",
      borrowDate: "2024-01-13",
      downloadDate: null,
      status: "borrowed",
      category: "Bisnis Digital",
    },
    {
      id: 4,
      user: "Nadia Aulia",
      email: "nadia.aulia@email.com",
      book: "Dasar-dasar Machine Learning",
      author: "Dr. Andi Prasetyo",
      borrowDate: "2024-01-12",
      downloadDate: "2024-01-13",
      status: "downloaded",
      category: "Informatika",
    },
  ];

  const stats = [
    {
      icon: Download,
      label: "Total Downloads",
      value: "1,234",
      change: "+15.7%",
    },
    { icon: BookOpen, label: "Books Borrowed", value: "567", change: "+8.3%" },
    { icon: User, label: "Active Borrowers", value: "89", change: "+12.1%" },
    {
      icon: TrendingUp,
      label: "Downloads Today",
      value: "45",
      change: "+22.5%",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "downloaded":
        return (
          <Badge className="bg-green-100 text-green-800">Downloaded</Badge>
        );
      case "borrowed":
        return <Badge className="bg-blue-100 text-blue-800">Borrowed</Badge>;
      case "returned":
        return <Badge className="bg-gray-100 text-gray-800">Returned</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredRecords = borrowingRecords.filter((record) => {
    const matchesSearch =
      record.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Borrowing & Download Reports
        </h1>
        <p className="text-xl text-gray-600">
          Track book downloads and borrowing activity across the platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by user, book, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="downloaded">Downloaded</SelectItem>
                <SelectItem value="borrowed">Borrowed</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-3">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {record.user}
                  </h3>
                  <p className="text-gray-600">{record.email}</p>
                </div>

                <div className="lg:col-span-3">
                  <h4 className="font-medium text-gray-800">{record.book}</h4>
                  <p className="text-sm text-gray-600">by {record.author}</p>
                  <p className="text-xs text-gray-500">{record.category}</p>
                </div>

                <div className="lg:col-span-2">
                  {getStatusBadge(record.status)}
                </div>

                <div className="lg:col-span-2">
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                    <Calendar className="h-4 w-4" />
                    Borrowed: {record.borrowDate}
                  </div>
                  {record.downloadDate && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Download className="h-4 w-4" />
                      Downloaded: {record.downloadDate}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <Button size="sm" variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 text-lg">
              No records found matching your filters.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Export Options */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline">Export to CSV</Button>
            <Button variant="outline">Export to PDF</Button>
            <Button variant="outline">Generate Monthly Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBorrowing;
