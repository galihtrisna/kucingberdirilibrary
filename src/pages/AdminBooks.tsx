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
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  isbn: string;
  thumbnail: string;
  stocks: number;
  digitalAvail: boolean;
  jenisBuku: string;
  status?: string;
  downloads?: number;
}

const API_BASE_URL = process.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AdminBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBookToEdit, setCurrentBookToEdit] = useState<Book | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Book>>({});

  const {
    data: books,
    isLoading,
    error,
  } = useQuery<Book[]>({
    queryKey: ["adminBooks"],
    queryFn: async () => {
      const response = await api.get("/book/all");
      const fetchedBooks: Book[] = response.data.data;

      return fetchedBooks.map((book) => ({
        ...book,
        status: book.stocks > 0 ? "approved" : "pending",
        downloads: Math.floor(Math.random() * 500),
      }));
    },
    refetchOnWindowFocus: false,
  });

  const updateBookMutation = useMutation({
    mutationFn: async ({
      bookId,
      updatedData,
    }: {
      bookId: number;
      updatedData: Partial<Book>;
    }) => {
      const response = await api.put(`/book/${bookId}`, updatedData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adminBooks"] });
      toast({
        title: "Success",
        description: `Buku ${variables.bookId} berhasil diperbarui.`,
      });
      setIsEditDialogOpen(false);
    },
    onError: (error: any) => {
      let errorMessage = "Failed to update book.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          error.response.data.data ||
          error.response.data.message ||
          error.message;
        if (typeof errorMessage === "object" && errorMessage !== null) {
          errorMessage = JSON.stringify(errorMessage);
        }
      }
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (bookId: number) => {
      const response = await api.delete(`/book/${bookId}`);
      return response.data;
    },
    onSuccess: (data, bookId) => {
      queryClient.invalidateQueries({ queryKey: ["adminBooks"] });
      toast({
        title: "Success",
        description: `Buku ${bookId} berhasil dihapus.`,
      });
    },
    onError: (error: any) => {
      let errorMessage = "Failed to delete book.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          error.response.data.data ||
          error.response.data.message ||
          error.message;
        if (typeof errorMessage === "object" && errorMessage !== null) {
          errorMessage = JSON.stringify(errorMessage);
        }
      }
      toast({
        title: "Deletion Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleApprove = (bookId: number) => {
    updateBookMutation.mutate({
      bookId,
      updatedData: { stocks: 1, digitalAvail: true },
    });
  };

  const handleReject = (bookId: number) => {
    deleteBookMutation.mutate(bookId);
  };

  const handleDelete = (bookId: number) => {
    deleteBookMutation.mutate(bookId);
  };

  const handleEdit = (book: Book) => {
    setCurrentBookToEdit(book);
    setEditFormData({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      year: book.year,
      isbn: book.isbn,
      thumbnail: book.thumbnail,
      stocks: book.stocks,
      digitalAvail: book.digitalAvail,
      jenisBuku: book.jenisBuku,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditFormChange = (field: keyof Book, value: any) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    if (currentBookToEdit) {
      updateBookMutation.mutate({
        bookId: currentBookToEdit.id,
        updatedData: editFormData,
      });
    }
  };

  const getStatusBadge = (status: string | undefined) => {
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

  const filteredBooks = (books || []).filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || book.status === statusFilter;
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

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Loading books...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">
            Error: Failed to fetch books. {error.message}
          </p>
          <p className="text-gray-500 text-sm mt-2">Please try again later.</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 text-lg">
              No books found matching your filters.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <Card key={book.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-4">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {book.title}
                    </h3>
                    <p className="text-gray-600">by {book.author}</p>
                    <p className="text-sm text-gray-500">{book.jenisBuku}</p>
                  </div>

                  <div className="lg:col-span-2">
                    {getStatusBadge(book.status)}
                  </div>

                  <div className="lg:col-span-2">
                    <p className="text-sm text-gray-600">Year: {book.year}</p>{" "}
                    {/* Menampilkan Year */}
                    <p className="text-sm text-gray-600">
                      Publisher: {book.publisher}
                    </p>{" "}
                  </div>

                  <div className="lg:col-span-2">
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {book.downloads} downloads
                    </p>
                    <p className="text-sm text-gray-600">
                      Stocks: {book.stocks}
                    </p>{" "}
                  </div>

                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/book/${book.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
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
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(book)}
                        >
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
      )}

      {/* Modal Edit Buku */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          {currentBookToEdit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={editFormData.title || ""}
                  onChange={(e) =>
                    handleEditFormChange("title", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-author" className="text-right">
                  Author
                </Label>
                <Input
                  id="edit-author"
                  value={editFormData.author || ""}
                  onChange={(e) =>
                    handleEditFormChange("author", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-publisher" className="text-right">
                  Publisher
                </Label>
                <Input
                  id="edit-publisher"
                  value={editFormData.publisher || ""}
                  onChange={(e) =>
                    handleEditFormChange("publisher", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-year" className="text-right">
                  Year
                </Label>
                <Input
                  id="edit-year"
                  type="number"
                  value={editFormData.year || ""}
                  onChange={(e) =>
                    handleEditFormChange("year", parseInt(e.target.value) || 0)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stocks" className="text-right">
                  Stocks
                </Label>
                <Input
                  id="edit-stocks"
                  type="number"
                  value={editFormData.stocks || ""}
                  onChange={(e) =>
                    handleEditFormChange(
                      "stocks",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-jenisBuku" className="text-right">
                  Category
                </Label>
                <Select
                  value={editFormData.jenisBuku || ""}
                  onValueChange={(value) =>
                    handleEditFormChange("jenisBuku", value)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="psychology">Psychology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-thumbnail" className="text-right">
                  Thumbnail URL
                </Label>
                <Input
                  id="edit-thumbnail"
                  type="url"
                  value={editFormData.thumbnail || ""}
                  onChange={(e) =>
                    handleEditFormChange("thumbnail", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-digitalAvail" className="text-right">
                  Digital Available
                </Label>
                <Select
                  value={editFormData.digitalAvail ? "true" : "false"}
                  onValueChange={(value) =>
                    handleEditFormChange("digitalAvail", value === "true")
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveEdit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBooks;
