import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, BookText, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
}

interface BorrowRec {
  id: number;
  book: Book;
  user: any;
  startBorrow: string;
  endBorrow: string;
  status: string;
  documentCode: string;
  jenis: string;
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

const Index = () => {
  const {
    data: allBooks,
    isLoading: isLoadingBooks,
    error: errorBooks,
  } = useQuery<Book[]>({
    queryKey: ["allBooksForIndex"],
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
    queryKey: ["allBorrowsForIndex"],
    queryFn: async () => {
      const response = await api.get("/borrow/history");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const featuredBooks = (allBooks || []).slice(0, 3);

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
    { icon: Star, label: "Rating Rata-rata", value: "4.8" },
  ];

  return (
    <div className="space-y-16">
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Selamat Datang di KBOeL
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Gerbang digital Anda menuju pengetahuan. Akses ribuan buku, makalah
            penelitian, dan materi pendidikan di platform perpustakaan terbuka
            kami yang dirancang untuk semua orang.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/catalog">Jelajahi Buku</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link to="/auth">Gabung Komunitas</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        {isLoadingBooks || isLoadingBorrows ? (
          <div className="text-center py-12">Memuat statistik...</div>
        ) : errorBooks || errorBorrows ? (
          <div className="text-center py-12 text-red-500">
            Kesalahan memuat statistik.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardContent className="space-y-4">
                  <stat.icon className="h-8 w-8 mx-auto text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Buku Unggulan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan buku-buku terpopuler dan terbaru kami di berbagai kategori
          </p>
        </div>

        {isLoadingBooks ? (
          <div className="text-center py-12">Memuat buku unggulan...</div>
        ) : errorBooks ? (
          <div className="text-center py-12 text-red-500">
            Kesalahan memuat buku unggulan.
          </div>
        ) : featuredBooks.length === 0 ? (
          <div className="text-center py-12">
            Tidak ada buku unggulan ditemukan.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <Card
                key={book.id}
                className="group hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-0"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                  <img
                    src={
                      book.thumbnail ||
                      "https://via.placeholder.com/300x400?text=Tidak+Ada+Sampul"
                    }
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {book.jenisBuku}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-600">oleh {book.author}</p>
                    <Button className="w-full mt-4" asChild>
                      <Link to={`/book/${book.id}`}>Lihat Detail</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/catalog">Lihat Semua Buku</Link>
          </Button>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Mengapa Memilih KBOeL?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Koleksi Luas</h3>
                    <p className="text-white/80">
                      Akses ribuan buku di semua genre dan mata pelajaran
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Didukung Komunitas</h3>
                    <p className="text-white/80">
                      Dibangun oleh pembaca, untuk pembaca dengan kontribusi
                      komunitas
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <BookText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Akses Gratis</h3>
                    <p className="text-white/80">
                      Pinjam dan baca buku sepenuhnya gratis
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
                alt="Perpustakaan Digital"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
