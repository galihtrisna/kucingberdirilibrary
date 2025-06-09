import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

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

const UploadBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    jenisBuku: "",
    isbn: "",
    year: "",
    publisher: "",
    stocks: 1,
    thumbnail: "",
    digitalAvail: true,
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.author ||
      !formData.jenisBuku ||
      !formData.isbn ||
      !formData.year ||
      !formData.publisher ||
      !formData.thumbnail
    ) {
      toast({
        title: "Kesalahan Validasi",
        description:
          "Mohon isi semua informasi buku yang diperlukan (Judul, Penulis, Kategori, ISBN, Tahun, Penerbit, Gambar Sampul).",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        title: formData.title,
        author: formData.author,
        publisher: formData.publisher,
        year: parseInt(formData.year),
        isbn: formData.isbn,
        thumbnail: formData.thumbnail,
        stocks: formData.stocks,
        digitalAvail: formData.digitalAvail,
        jenisBuku: formData.jenisBuku,
      };

      await api.post("/book/add", payload);

      toast({
        title: "Buku Berhasil Diunggah!",
        description:
          "Buku Anda telah diajukan untuk ditinjau dan akan tersedia setelah disetujui.",
      });

      setFormData({
        title: "",
        author: "",
        jenisBuku: "",
        isbn: "",
        year: "",
        publisher: "",
        stocks: 1,
        thumbnail: "",
        digitalAvail: true,
      });
    } catch (error: any) {
      let errorMessage =
        "Terjadi kesalahan yang tidak terduga saat mengunggah. Silakan coba lagi.";
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
        title: "Unggah Gagal",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Unggah Buku</h1>
        <p className="text-xl text-gray-600">
          Berkontribusi ke perpustakaan digital kami dengan berbagi pengetahuan
          dengan komunitas
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Informasi Buku
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Judul Buku *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Masukkan judul buku"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Penulis *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) =>
                        handleInputChange("author", e.target.value)
                      }
                      placeholder="Masukkan nama penulis"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="jenisBuku">Kategori *</Label>
                    <Select
                      value={formData.jenisBuku}
                      onValueChange={(value) =>
                        handleInputChange("jenisBuku", value)
                      }
                    >
                      <SelectTrigger>
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
                  <div>
                    <Label htmlFor="year">Tahun Terbit *</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) =>
                        handleInputChange("year", e.target.value)
                      }
                      placeholder="2024"
                      type="number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="publisher">Penerbit *</Label>
                    <Input
                      id="publisher"
                      value={formData.publisher}
                      onChange={(e) =>
                        handleInputChange("publisher", e.target.value)
                      }
                      placeholder="Penerbit X"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="isbn">ISBN *</Label>
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => handleInputChange("isbn", e.target.value)}
                    placeholder="978-0-123456-78-9"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="thumbnail">URL Gambar Sampul *</Label>
                  <Input
                    id="thumbnail"
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) =>
                      handleInputChange("thumbnail", e.target.value)
                    }
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                  />
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt="Pratinjau Gambar Sampul"
                      className="mt-2 w-24 h-32 object-cover rounded"
                    />
                  )}
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Upload className="h-4 w-4 mr-2" />
                  Unggah Buku
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Pedoman Unggah
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Persyaratan File
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• URL Gambar Sampul (JPG/PNG)</li>
                  <li>• (Abaikan untuk unggah file PDF saat ini)</li>
                  <li>• Konten jelas dan mudah dibaca</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Kebijakan Konten
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tidak ada materi berhak cipta</li>
                  <li>• Konten pendidikan lebih disukai</li>
                  <li>• Karya asli dipersilakan</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Proses Peninjauan
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                    1
                  </div>
                  <span className="text-sm text-gray-600">
                    Ajukan buku Anda
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                    2
                  </div>
                  <span className="text-sm text-gray-600">
                    Peninjauan admin (1-3 hari)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                    3
                  </div>
                  <span className="text-sm text-gray-600">
                    Diterbitkan di katalog
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadBook;
