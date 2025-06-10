import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Download,
  Heart,
  Clock,
  Star,
  Eye,
  User,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BorrowRecFromAPI {
  id: number;
  book: {
    id: number;
    title: string;
    author: string;
    thumbnail: string;
    jenisBuku: string;
  };
  user: any;
  startBorrow: string;
  endBorrow: string | null;
  status: string;
  documentCode: string;
  jenis: string;
}

interface UserProfile {
  id: number;
  username: string;
  fullName: string;
  role: string;
  // Tambahkan field lain jika ada di response /auth/me
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

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Query untuk mendapatkan data pengguna yang sedang login
  const {
    data: currentUserData,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useQuery<UserProfile>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("Tidak ada token ditemukan");
      // Asumsi endpoint /auth/me mengembalikan object user profile
      const response = await api.get("/auth/me"); // Sesuaikan jika endpointnya berbeda
      return response.data.data; // Asumsi ApiResponse structure { data: UserProfile }
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: borrowHistory,
    isLoading: isLoadingBorrowHistory,
    error: errorBorrowHistory,
  } = useQuery<BorrowRecFromAPI[]>({
    queryKey: ["borrowHistory"],
    queryFn: async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("Tidak ada token ditemukan");
      const response = await api.get("/borrow/history");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const borrowedBooks = (borrowHistory || [])
    .filter(
      (rec) =>
        rec.status.toLowerCase() === "borrowed" ||
        rec.status.toLowerCase() === "returned"
    )
    .map((rec) => ({
      id: rec.book.id,
      title: rec.book.title,
      author: rec.book.author,
      cover: rec.book.thumbnail,
      borrowDate: new Date(rec.startBorrow).toLocaleDateString("id-ID"),
      progress: rec.status.toLowerCase() === "returned" ? 100 : 50,
      category: rec.book.jenisBuku,
      returnDate: rec.endBorrow
        ? new Date(rec.endBorrow).toLocaleDateString("id-ID")
        : "Belum Dikembalikan",
    }));

  const recentActivity = (borrowHistory || [])
    .sort(
      (a, b) =>
        new Date(b.startBorrow).getTime() - new Date(a.startBorrow).getTime()
    )
    .slice(0, 4)
    .map((rec) => ({
      id: rec.id,
      action: rec.status === "BORROWED" ? "Meminjam" : "Mengembalikan",
      item: rec.book.title,
      date: new Date(rec.startBorrow).toLocaleDateString("id-ID"),
      icon: rec.status === "BORROWED" ? BookOpen : Download,
    }));

  const userStats = [
    {
      icon: BookOpen,
      label: "Buku Dipinjam",
      value: isLoadingBorrowHistory
        ? "..."
        : borrowedBooks.length.toLocaleString(),
      color: "text-blue-600",
    },
    // { icon: Heart, label: "Favorit", value: "8", color: "text-red-600" }, // Dihapus sesuai permintaan sebelumnya
    // {
    //   icon: Clock,
    //   label: "Jam Membaca",
    //   value: "47",
    //   color: "text-green-600",
    // }, // Dihapus sesuai permintaan sebelumnya
    // {
    //   icon: Star,
    //   label: "Ulasan Ditulis",
    //   value: "12",
    //   color: "text-yellow-600",
    // }, // Dihapus sesuai permintaan sebelumnya
  ];

  const userName = isLoadingUser
    ? "Memuat..."
    : currentUserData?.fullName || "Pengguna";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dasbor</h1>
          <p className="text-gray-600">Selamat datang kembali, {userName}!</p>
        </div>
        {/* Tombol Edit Profil di-comment out sesuai permintaan sebelumnya */}
        {/* <Button asChild>
          <Link to="/profile">
            <User className="h-4 w-4 mr-2" />
            Edit Profil
          </Link>
        </Button> */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
          <TabsTrigger value="borrowed">Buku Dipinjam</TabsTrigger>
          <TabsTrigger value="favorites">Favorit</TabsTrigger>
          <TabsTrigger value="activity">Aktivitas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peminjaman Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingBorrowHistory ? (
                  <div className="text-center py-4">Memuat peminjaman...</div>
                ) : errorBorrowHistory ? (
                  <div className="text-center py-4 text-red-500">
                    Kesalahan memuat peminjaman.
                  </div>
                ) : borrowedBooks.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    Tidak ada buku yang dipinjam.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {borrowedBooks.slice(0, 3).map((book) => (
                      <div
                        key={book.id}
                        className="flex items-center space-x-3"
                      >
                        <img
                          src={
                            book.cover ||
                            "https://via.placeholder.com/150x200?text=No+Cover"
                          }
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">
                            {book.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            oleh {book.author}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="bg-gray-200 rounded-full h-2 flex-1">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${book.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">
                              {book.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setActiveTab("borrowed")}
                >
                  Lihat Semua Buku Dipinjam
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingBorrowHistory ? (
                  <div className="text-center py-4">Memuat aktivitas...</div>
                ) : errorBorrowHistory ? (
                  <div className="text-center py-4 text-red-500">
                    Kesalahan memuat aktivitas.
                  </div>
                ) : recentActivity.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    Tidak ada aktivitas terbaru.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-3"
                      >
                        <div className="bg-blue-100 rounded-full p-2">
                          <activity.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">
                            <span className="font-medium">
                              {activity.action}
                            </span>{" "}
                            "{activity.item}"
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setActiveTab("activity")}
                >
                  Lihat Semua Aktivitas
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="borrowed">
          <Card>
            <CardHeader>
              <CardTitle>Buku Dipinjam</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingBorrowHistory ? (
                <div className="text-center py-4">Memuat buku dipinjam...</div>
              ) : errorBorrowHistory ? (
                <div className="text-center py-4 text-red-500">
                  Kesalahan memuat buku dipinjam.
                </div>
              ) : borrowedBooks.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  Tidak ada buku yang dipinjam.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {borrowedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <img
                        src={
                          book.cover ||
                          "https://via.placeholder.com/150x200?text=No+Cover"
                        }
                        alt={book.title}
                        className="w-full h-48 object-cover rounded mb-3"
                      />
                      <div className="space-y-2">
                        <Badge variant="secondary">{book.category}</Badge>
                        <h3 className="font-semibold text-gray-800 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          oleh {book.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          Dipinjam: {book.borrowDate}
                          {book.returnDate !== "Belum Dikembalikan" &&
                            ` | Kembali: ${book.returnDate}`}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="bg-gray-200 rounded-full h-2 flex-1">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {book.progress}%
                          </span>
                        </div>
                        <Button size="sm" className="w-full" asChild>
                          <Link to={`/book/${book.id}`}>Lanjutkan Membaca</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Buku Favorit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=200&fit=crop"
                    alt="Pemrograman Web Lanjut"
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Web Development</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">4.9</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-800 line-clamp-2">
                      Pemrograman Web Lanjut
                    </h3>
                    <p className="text-sm text-gray-600">
                      oleh Eka Prasetya, M.T.
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" asChild>
                        <Link to={`/book/1`}>Lihat Detail</Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&h=200&fit=crop"
                    alt="Dasar-Dasar Machine Learning"
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Data Science</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">4.7</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-800 line-clamp-2">
                      Dasar-Dasar Machine Learning
                    </h3>
                    <p className="text-sm text-gray-600">oleh Teguh Hariyadi</p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" asChild>
                        <Link to={`/book/2`}>Lihat Detail</Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Log Aktivitas</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingBorrowHistory ? (
                <div className="text-center py-4">Memuat log aktivitas...</div>
              ) : errorBorrowHistory ? (
                <div className="text-center py-4 text-red-500">
                  Kesalahan memuat log aktivitas.
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  Tidak ada aktivitas.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <div className="bg-blue-100 rounded-full p-3">
                        <activity.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">
                          <span className="font-medium">{activity.action}</span>{" "}
                          "{activity.item}"
                        </p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
