import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Calendar,
  User,
  ArrowLeft,
  Heart,
  Share2,
  BookText,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getRoleFromToken } from "@/lib/jwt"; // Impor getRoleFromToken

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

interface Review {
  id: number;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
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

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newReviewContent, setNewReviewContent] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const userRole = getRoleFromToken(); // Ambil peran pengguna

  const {
    data: book,
    isLoading,
    error,
  } = useQuery<Book>({
    queryKey: ["book", id],
    queryFn: async () => {
      if (!id) throw new Error("ID Buku hilang");
      const response = await api.get(`/book/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  const {
    data: reviews,
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useQuery<Review[]>({
    queryKey: ["bookReviews", id],
    queryFn: async () => {
      if (!id) throw new Error("ID Buku hilang untuk review");
      const response = await api.get(`/review/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  const borrowBookMutation = useMutation({
    mutationFn: async (bookId: number) => {
      const response = await api.post(`/borrow/${bookId}`);
      return response.data;
    },
    onSuccess: (message) => {
      toast({
        title: "Peminjaman Berhasil!",
        description: message,
      });
      queryClient.invalidateQueries({ queryKey: ["borrowHistory"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book", id] });
    },
    onError: (error: any) => {
      let errorMessage = "Gagal meminjam buku. Silakan coba lagi.";

      if (axios.isAxiosError(error) && error.response) {
        const serverMessage =
          error.response.data.data ||
          error.response.data.message ||
          error.message;

        if (typeof serverMessage === "string") {
          if (serverMessage.toLowerCase().includes("stok")) {
            errorMessage = "Stok buku habis. Tidak bisa dipinjam saat ini.";
          } else {
            errorMessage = serverMessage;
          }
        } else if (
          typeof serverMessage === "object" &&
          serverMessage !== null
        ) {
          errorMessage = JSON.stringify(serverMessage);
        }
      }

      toast({
        title: "Peminjaman Gagal",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async ({
      bookId,
      content,
      rating,
    }: {
      bookId: number;
      content: string;
      rating: number;
    }) => {
      const response = await api.post(`/review/${bookId}`, { content, rating });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Ulasan Ditambahkan!",
        description: "Ulasan Anda telah berhasil ditambahkan.",
      });
      setNewReviewContent("");
      setNewReviewRating(0);
      queryClient.invalidateQueries({ queryKey: ["bookReviews", id] });
    },
    onError: (error: any) => {
      let errorMessage = "Gagal menambahkan ulasan. Silakan coba lagi.";
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
        title: "Penambahan Ulasan Gagal",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleBorrow = () => {
    if (book?.id) {
      borrowBookMutation.mutate(book.id);
    } else {
      toast({
        title: "Kesalahan",
        description: "Buku tidak ditemukan untuk dipinjam.",
        variant: "destructive",
      });
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (book?.id && newReviewContent && newReviewRating > 0) {
      addReviewMutation.mutate({
        bookId: book.id,
        content: newReviewContent,
        rating: newReviewRating,
      });
    } else {
      toast({
        title: "Kesalahan",
        description: "Silakan isi konten dan rating ulasan.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Memuat detail buku...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Kesalahan: Gagal mengambil detail buku. {error.message}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Buku tidak ditemukan.</p>
        <Link
          to="/catalog"
          className="text-blue-500 hover:underline mt-4 block"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const averageRating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "N/A";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link
          to="/catalog"
          className="hover:text-blue-600 flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Katalog
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <img
                src={
                  book.thumbnail ||
                  "https://via.placeholder.com/400x600?text=Tidak+Ada+Sampul"
                }
                alt={book.title}
                className="w-full rounded-lg shadow-lg mb-6"
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{averageRating}</span>
                    <span className="text-gray-600">
                      ({reviews ? reviews.length : 0} ulasan)
                    </span>
                  </div>
                </div>

                {/* Tombol Pinjam, Favorit, Bagikan hanya tampil jika role MEMBER */}
                {userRole === "MEMBER" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        className="w-full"
                        onClick={handleBorrow}
                        disabled={
                          borrowBookMutation.isPending || book.stocks === 0
                        }
                      >
                        <BookText className="h-4 w-4 mr-2" />
                        {borrowBookMutation.isPending
                          ? "Meminjam..."
                          : book.stocks === 0
                          ? "Stok Habis"
                          : "Pinjam"}
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Heart className="h-4 w-4 mr-2" />
                        Favorit
                      </Button>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Bagikan Buku
                    </Button>
                  </>
                )}

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stok Tersedia:</span>
                    <span className="font-medium">{book.stocks}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{book.jenisBuku}</Badge>
              <div className="flex items-center gap-1 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{book.year}</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {book.title}
            </h1>
            <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
              <User className="h-5 w-5" />
              <span>oleh {book.author}</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Deskripsi</h2>
              <div className="prose prose-gray max-w-none">
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Buku ini ditulis oleh {book.author} dan diterbitkan oleh{" "}
                  {book.publisher} pada tahun {book.year}. Dengan ISBN{" "}
                  {book.isbn}, buku ini termasuk dalam kategori {book.jenisBuku}
                  .
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Informasi Buku</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium">ISBN:</span>
                    <span className="ml-2">{book.isbn}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Penerbit:</span>
                    <span className="ml-2">{book.publisher}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium">Kategori:</span>
                    <span className="ml-2">{book.jenisBuku}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Tahun:</span>
                    <span className="ml-2">{book.year}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ulasan</h2>
              {isLoadingReviews ? (
                <div className="text-center py-4">Memuat ulasan...</div>
              ) : errorReviews ? (
                <div className="text-center py-4 text-red-500">
                  Kesalahan: Gagal mengambil ulasan.
                </div>
              ) : reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {review.user.fullName}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Belum ada ulasan untuk buku ini.
                </div>
              )}
              {/* Formulir Ulasan hanya tampil jika role MEMBER */}
              {userRole === "MEMBER" && (
                <form onSubmit={handleAddReview} className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="review-content">Tulis Ulasan Anda</Label>
                    <Textarea
                      id="review-content"
                      placeholder="Bagikan pemikiran Anda tentang buku ini..."
                      value={newReviewContent}
                      onChange={(e) => setNewReviewContent(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="review-rating">Rating (1-5)</Label>
                    <Input
                      id="review-rating"
                      type="number"
                      min="1"
                      max="5"
                      value={newReviewRating === 0 ? "" : newReviewRating}
                      onChange={(e) =>
                        setNewReviewRating(parseInt(e.target.value) || 0)
                      }
                      className="w-24"
                    />
                  </div>
                  <Button type="submit" disabled={addReviewMutation.isPending}>
                    {addReviewMutation.isPending
                      ? "Mengirim..."
                      : "Kirim Ulasan"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
