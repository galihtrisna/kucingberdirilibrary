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
import { Search, Calendar, User, BookOpen } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface BorrowRecFromAPI {
  id: number;
  book: {
    title: string;
    author: string;
    jenisBuku: string;
  };
  user: {
    username: string;
    fullName: string;
  };
  startBorrow: string;
  endBorrow: string | null;
  status: string;
  documentCode: string; // Pastikan ini ada di interface
}

const API_BASE_URL = process.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken"); // Menggunakan "jwtToken"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AdminBorrowing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: borrowingRecords,
    isLoading,
    error,
  } = useQuery<BorrowRecFromAPI[]>({
    queryKey: ["adminBorrowingRecords"],
    queryFn: async () => {
      // Pastikan endpoint ini benar untuk mendapatkan semua riwayat peminjaman
      // Jika endpoint untuk admin berbeda dengan endpoint member, pastikan ini sesuai
      const response = await api.get("/borrow/history/all");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const returnBookMutation = useMutation({
    mutationFn: async (documentCode: string) => {
      // Mengubah tipe menjadi string
      const token = localStorage.getItem("jwtToken"); // Menggunakan "jwtToken"
      const response = await api.post(`/borrow/return/${documentCode}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },

    onSuccess: (message, documentCode) => {
      queryClient.invalidateQueries({ queryKey: ["adminBorrowingRecords"] });
      queryClient.invalidateQueries({ queryKey: ["adminBooks"] });
      toast({
        title: "Berhasil",
        description: `Peminjaman dengan kode ${documentCode} berhasil dikembalikan.`,
      });
    },
    onError: (error: any) => {
      let errorMessage = "Gagal mengembalikan buku.";
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
        title: "Pengembalian Gagal",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleReturnBook = (documentCode: string) => {
    // Mengubah tipe menjadi string
    returnBookMutation.mutate(documentCode);
  };

  const stats = [
    {
      icon: BookOpen,
      label: "Buku Dipinjam",
      value: isLoading
        ? "..."
        : (borrowingRecords || [])
            .filter((rec) => rec.status.toLowerCase() === "borrowed")
            .length.toLocaleString(),
    },
    {
      icon: User,
      label: "Pengguna Aktif Meminjam",
      value: isLoading
        ? "..."
        : new Set(
            (borrowingRecords || [])
              .filter((rec) => rec.status.toLowerCase() === "borrowed")
              .map((rec) => rec.user.username)
          ).size.toLocaleString(),
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "borrowed":
        return <Badge className="bg-blue-100 text-blue-800">Dipinjam</Badge>;
      case "returned":
        return (
          <Badge className="bg-gray-100 text-gray-800">Dikembalikan</Badge>
        );
      default:
        return <Badge variant="secondary">Tidak Diketahui</Badge>;
    }
  };

  const filteredRecords = (borrowingRecords || []).filter((record) => {
    const matchesSearch =
      record.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || record.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Laporan Peminjaman
        </h1>
        <p className="text-xl text-gray-600">
          Lacak aktivitas peminjaman buku di platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Saring Catatan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari berdasarkan pengguna, buku, atau email..."
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
                <SelectItem value="borrowed">Dipinjam</SelectItem>
                <SelectItem value="returned">Dikembalikan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-12">Memuat catatan peminjaman...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          Kesalahan: Gagal mengambil catatan peminjaman. {error.message}
        </div>
      ) : filteredRecords.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 text-lg">
              Tidak ada catatan yang ditemukan sesuai filter Anda.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <Card key={record.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-3">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {record.user.fullName}
                    </h3>
                    <p className="text-gray-600">{record.user.username}</p>
                  </div>

                  <div className="lg:col-span-3">
                    <h4 className="font-medium text-gray-800">
                      {record.book.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      oleh {record.book.author}
                    </p>
                    <p className="text-xs text-gray-500">
                      {record.book.jenisBuku}
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    {getStatusBadge(record.status.toLowerCase())}
                  </div>

                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      <Calendar className="h-4 w-4" />
                      Tanggal Pinjam:{" "}
                      {new Date(record.startBorrow).toLocaleDateString()}
                    </div>
                    {record.endBorrow && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        Tanggal Kembali:{" "}
                        {new Date(record.endBorrow).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-2">
                    {record.status.toLowerCase() === "borrowed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReturnBook(record.documentCode)} // Menggunakan record.documentCode
                      >
                        Tandai Dikembalikan
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Ekspor Laporan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline">Ekspor ke CSV</Button>
            <Button variant="outline">Ekspor ke PDF</Button>
            <Button variant="outline">Buat Laporan Bulanan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBorrowing;
