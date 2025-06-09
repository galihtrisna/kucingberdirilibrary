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
        title: "Berhasil",
        description: `Buku ${variables.bookId} berhasil diperbarui.`,
      });
      setIsEditDialogOpen(false);
    },
    onError: (error: any) => {
      let errorMessage = "Gagal memperbarui buku.";
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
        title: "Pembaharuan Gagal",
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
        title: "Berhasil",
        description: `Buku ${bookId} berhasil dihapus.`,
      });
    },
    onError: (error: any) => {
      let errorMessage = "Gagal menghapus buku.";
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
        title: "Penghapusan Gagal",
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
        return <Badge className="bg-green-100 text-green-800">Disetujui</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Menunggu</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Ditolak</Badge>;
      default:
        return <Badge variant="secondary">Tidak Diketahui</Badge>;
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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Kelola Buku</h1>
        <p className="text-xl text-gray-600">
          Tinjau, setujui, dan kelola semua buku di perpustakaan
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Saring Buku</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari berdasarkan judul atau penulis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Saring berdasarkan status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="approved">Disetujui</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Memuat buku...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">
            Kesalahan: Gagal mengambil buku. {error.message}
          </p>
          <p className="text-gray-500 text-sm mt-2">Silakan coba lagi nanti.</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 text-lg">
              Tidak ada buku yang ditemukan sesuai filter Anda.
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
                    <p className="text-gray-600">oleh {book.author}</p>
                    <p className="text-sm text-gray-500">{book.jenisBuku}</p>
                  </div>

                  <div className="lg:col-span-2">
                    {getStatusBadge(book.status)}
                  </div>

                  <div className="lg:col-span-2">
                    <p className="text-sm text-gray-600">Tahun: {book.year}</p>
                    <p className="text-sm text-gray-600">
                      Penerbit: {book.publisher}
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    <p className="text-sm text-gray-600">
                      Stok: {book.stocks}
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/book/${book.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Lihat
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
                            Setujui
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(book.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Tolak
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
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Buku</DialogTitle>
          </DialogHeader>
          {currentBookToEdit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Judul
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
                  Penulis
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
                  Penerbit
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
                  Tahun
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
                  Stok
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
                  Kategori
                </Label>
                <Select
                  value={editFormData.jenisBuku || ""}
                  onValueChange={(value) =>
                    handleEditFormChange("jenisBuku", value)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Teknologi</SelectItem>
                    <SelectItem value="science">Sains</SelectItem>
                    <SelectItem value="literature">Sastra</SelectItem>
                    <SelectItem value="history">Sejarah</SelectItem>
                    <SelectItem value="education">Edukasi</SelectItem>
                    <SelectItem value="business">Bisnis</SelectItem>
                    <SelectItem value="programming">Pemrograman</SelectItem>
                    <SelectItem value="design">Desain</SelectItem>
                    <SelectItem value="psychology">Psikologi</SelectItem>
                    <SelectItem value="other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-digitalAvail" className="text-right">
                  Tersedia Digital
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
                    <SelectItem value="true">Ya</SelectItem>
                    <SelectItem value="false">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveEdit}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBooks;