import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, BookText, Upload } from "lucide-react"; // Import icon Upload
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Book {
  id: number;
}

interface BorrowRec {
  id: number;
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

const AdminDashboard = () => {
  const {
    data: allBooks,
    isLoading: isLoadingBooks,
    error: errorBooks,
  } = useQuery<Book[]>({
    queryKey: ["allBooksForAdmin"],
    queryFn: async () => {
      const response = await api.get("/book/all");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: allBorrows,
    isLoading: isLoadingBorrows,
    error: errorBorrows,
  } = useQuery<BorrowRec[]>({
    queryKey: ["allBorrowsForAdmin"],
    queryFn: async () => {
      const response = await api.get("/borrow/history");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const stats = [
    {
      icon: BookOpen,
      label: "Total Buku",
      value: isLoadingBooks
        ? "..."
        : allBooks
        ? allBooks.length.toLocaleString()
        : "0",
    },
    { icon: Users, label: "Pengguna Aktif", value: "8,921" },
    {
      icon: BookText,
      label: "Total Peminjaman",
      value: isLoadingBorrows
        ? "..."
        : allBorrows
        ? allBorrows.length.toLocaleString()
        : "0",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Dashboard Admin
        </h1>
        <p className="text-xl text-gray-600">
          Kelola dan pantau platform perpustakaan digital Anda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Tindakan Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/books">
                <BookOpen className="h-4 w-4 mr-2" />
                Kelola Buku
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/borrowing">
                <BookText className="h-4 w-4 mr-2" />
                Lihat Laporan Peminjaman
              </Link>
            </Button>
            {/* Tombol baru untuk Unggah Buku */}
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/upload">
                <Upload className="h-4 w-4 mr-2" />
                Unggah Buku
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Sistem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-gray-800">Status Server</h3>
                <p className="text-sm text-green-600">Online</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-gray-800">Basis Data</h3>
                <p className="text-sm text-green-600">Terhubung</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-gray-800">Pencadangan</h3>
                <p className="text-sm text-yellow-600">Terjadwal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
