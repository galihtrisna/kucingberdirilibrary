import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Download,
  Calendar,
  FileText,
  User,
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react";

const BookDetail = () => {
  const { id } = useParams();

  // Mock book data - in a real app, this would be fetched based on the ID
  const book = {
    id: parseInt(id || "1"),
    title: "Struktur Data dan Algoritma",
    author: "Ir. Bambang Sutrisno, M.T.",
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Pemrograman",
    year: 2021,
    rating: 4.6,
    downloads: 1342,
    fileSize: "10.4 MB",
    pages: 412,
    language: "Indonesia",
    isbn: "978-6021234567",
    uploadDate: "2023-09-10",
    publisher: "Penerbit Informatika Bandung",
    description: `Buku ini membahas dasar-dasar struktur data dan algoritma yang menjadi fondasi utama dalam pengembangan perangkat lunak.

Materi mencakup array, linked list, stack, queue, tree, graph, serta berbagai algoritma pengurutan dan pencarian. Penjelasan diberikan dengan pendekatan teoritis yang kuat dan didukung studi kasus nyata dalam bahasa C dan Java.

Ditujukan untuk mahasiswa Informatika tingkat awal hingga menengah yang ingin memahami cara kerja struktur data secara efisien dan aplikatif.

Topik utama:
• Array, List, dan Pointer  
• Stack dan Queue  
• Binary Tree dan Graph  
• Sorting dan Searching  
• Analisis Kompleksitas Algoritma`,
    tableOfContents: [
      "Bab 1: Konsep Dasar Struktur Data",
      "Bab 2: Array dan Pointer",
      "Bab 3: Linked List",
      "Bab 4: Stack dan Queue",
      "Bab 5: Binary Tree",
      "Bab 6: Graph dan Traversal",
      "Bab 7: Sorting Algorithms",
      "Bab 8: Searching Techniques",
      "Bab 9: Kompleksitas Waktu dan Ruang",
    ],
    tags: [
      "Struktur Data",
      "Algoritma",
      "Pemrograman",
      "Informatika",
      "C",
      "Java",
    ],
    reviews: [
      {
        id: 1,
        user: "Rizky Maulana",
        rating: 5,
        comment: "Penjelasan sangat mudah dipahami dan cocok untuk pemula.",
        date: "2023-10-01",
      },
      {
        id: 2,
        user: "Dewi Pratiwi",
        rating: 4,
        comment:
          "Cocok untuk referensi kuliah dan tugas besar. Banyak contoh kodenya.",
        date: "2023-11-12",
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link
          to="/catalog"
          className="hover:text-blue-600 flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Book Cover and Actions */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full rounded-lg shadow-lg mb-6"
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{book.rating}</span>
                    <span className="text-gray-600">
                      ({book.reviews.length} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Download className="h-4 w-4" />
                    <span>{book.downloads}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorite
                  </Button>
                </div>

                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Book
                </Button>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">File Size:</span>
                    <span className="font-medium">{book.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pages:</span>
                    <span className="font-medium">{book.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">{book.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">PDF</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{book.category}</Badge>
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
              <span>by {book.author}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <div className="prose prose-gray max-w-none">
                {book.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Table of Contents
              </h2>
              <ul className="space-y-2">
                {book.tableOfContents.map((chapter, index) => (
                  <li
                    key={index}
                    className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    {chapter}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Book Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Book Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium">ISBN:</span>
                    <span className="ml-2">{book.isbn}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">
                      Publisher:
                    </span>
                    <span className="ml-2">{book.publisher}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">
                      Upload Date:
                    </span>
                    <span className="ml-2">{book.uploadDate}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium">Category:</span>
                    <span className="ml-2">{book.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Language:</span>
                    <span className="ml-2">{book.language}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">
                      Total Downloads:
                    </span>
                    <span className="ml-2">
                      {book.downloads.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {book.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.user}</span>
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
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Write a Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
