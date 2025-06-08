
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Edit, Trash2, CheckCircle, XCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  
  const books = [
  {
    id: 1,
    title: "Pengantar Ilmu Komputer",
    author: "Dr. Sari Lestari",
    category: "Informatika",
    status: "approved",
    uploadDate: "2024-01-15",
    downloads: 234,
    fileSize: "2.4 MB"
  },
  {
    id: 2,
    title: "Pemrograman Web Modern",
    author: "Budi Santoso",
    category: "Pemrograman",
    status: "pending",
    uploadDate: "2024-01-14",
    downloads: 0,
    fileSize: "3.2 MB"
  },
  {
    id: 3,
    title: "Panduan Digital Marketing",
    author: "Rina Kurnia",
    category: "Bisnis Digital",
    status: "approved",
    uploadDate: "2024-01-13",
    downloads: 156,
    fileSize: "1.8 MB"
  },
  {
    id: 4,
    title: "Dasar-dasar Machine Learning",
    author: "Dr. Andi Prasetyo",
    category: "Informatika",
    status: "rejected",
    uploadDate: "2024-01-12",
    downloads: 0,
    fileSize: "4.1 MB"
  }
];


  const handleApprove = (bookId: number) => {
    toast({
      title: "Book Approved",
      description: "The book has been approved and is now available in the catalog.",
    });
  };

  const handleReject = (bookId: number) => {
    toast({
      title: "Book Rejected",
      description: "The book has been rejected and removed from pending list.",
      variant: "destructive"
    });
  };

  const handleDelete = (bookId: number) => {
    toast({
      title: "Book Deleted",
      description: "The book has been permanently deleted from the system.",
      variant: "destructive"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Manage Books</h1>
        <p className="text-xl text-gray-600">
          Review, approve, and manage all books in the library
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title or author..."
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Books List */}
      <div className="space-y-4">
        {filteredBooks.map((book) => (
          <Card key={book.id}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-4">
                  <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
                  <p className="text-gray-600">by {book.author}</p>
                  <p className="text-sm text-gray-500">{book.category}</p>
                </div>
                
                <div className="lg:col-span-2">
                  {getStatusBadge(book.status)}
                </div>
                
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-600">Uploaded: {book.uploadDate}</p>
                  <p className="text-sm text-gray-600">Size: {book.fileSize}</p>
                </div>
                
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {book.downloads} downloads
                  </p>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    {book.status === "pending" && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(book.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleReject(book.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {book.status === "approved" && (
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDelete(book.id)}
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

      {filteredBooks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 text-lg">No books found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminBooks;
