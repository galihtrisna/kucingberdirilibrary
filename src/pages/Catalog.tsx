import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid, List, Star } from "lucide-react";
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

const API_BASE_URL = process.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

const Catalog = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("title");

  const {
    data: books,
    isLoading,
    error,
  } = useQuery<Book[]>({
    queryKey: ["books", searchTerm, selectedCategory, sortBy],
    queryFn: async () => {
      const response = await api.get("/book/all");
      return response.data.data;
    },
  });

  const { data: categoriesFromApi } = useQuery<string[]>({
    queryKey: ["bookJenis"],
    queryFn: async () => {
      const response = await api.get("/book/jenis");
      return ["Semua Kategori", ...response.data];
    },
    initialData: ["Semua Kategori"],
    refetchOnWindowFocus: false,
  });

  const availableCategories = categoriesFromApi || ["Semua Kategori"];

  const filteredBooks = (books || [])
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        book.jenisBuku.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "author") {
        return a.author.localeCompare(b.author);
      }
      if (sortBy === "year") {
        return a.year - b.year;
      }

      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Katalog Buku</h1>
        <p className="text-gray-600">
          Jelajahi koleksi kami sebanyak {books ? books.length : 0} buku
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari buku atau penulis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              {availableCategories.map((category) => (
                <SelectItem
                  key={category}
                  value={category === "Semua Kategori" ? "all" : category}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Urutkan berdasarkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Judul</SelectItem>
              <SelectItem value="author">Penulis</SelectItem>
              <SelectItem value="year">Tahun</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Menampilkan {filteredBooks.length} dari {books ? books.length : 0}{" "}
          buku
        </p>
      </div>

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
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            Tidak ada buku yang ditemukan sesuai kriteria Anda.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Coba sesuaikan pencarian atau filter Anda.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="group hover:shadow-lg transition-all duration-300"
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
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {book.jenisBuku}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600">oleh {book.author}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{book.year}</span>
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link to={`/book/${book.id}`}>Lihat Detail</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <img
                    src={
                      book.thumbnail ||
                      "https://via.placeholder.com/300x400?text=Tidak+Ada+Sampul"
                    }
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {book.title}
                        </h3>
                        <p className="text-gray-600">oleh {book.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        {book.jenisBuku}
                      </span>
                      <span>Tahun: {book.year}</span>
                    </div>
                    <Button asChild>
                      <Link to={`/book/${book.id}`}>Lihat Detail</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredBooks.length === 0 && !isLoading && !error && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            Tidak ada buku yang ditemukan sesuai kriteria Anda.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Coba sesuaikan pencarian atau filter Anda.
          </p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
