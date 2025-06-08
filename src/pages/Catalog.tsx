
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Grid, List, Star, Download } from "lucide-react";

const Catalog = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("title");

  const categories = [
    "All Categories",
    "Technology",
    "Science",
    "Business",
    "Literature",
    "History",
    "Mathematics",
    "Programming",
    "Design",
    "Psychology"
  ];

  const books = [
  {
    "id": 1,
    "title": "Struktur Data dan Algoritma",
    "author": "Ir. Bambang Sutrisno, M.T.",
    "cover": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=400&fit=crop",
    "category": "Pemrograman",
    "year": 2021,
    "rating": 4.6,
    "downloads": 1342,
    "fileSize": "10.4 MB",
    "description": "Dasar-dasar struktur data dan algoritma dalam pemrograman komputer menggunakan C dan Java."
  },
  {
    "id": 2,
    "title": "Pengantar Kecerdasan Buatan",
    "author": "Dr. Andi Setiawan",
    "cover": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=400&fit=crop",
    "category": "Artificial Intelligence",
    "year": 2023,
    "rating": 4.8,
    "downloads": 1987,
    "fileSize": "14.2 MB",
    "description": "Konsep dasar kecerdasan buatan, termasuk machine learning dan logika fuzzy."
  },
  {
    "id": 3,
    "title": "Sistem Operasi",
    "author": "Prof. Dr. Rina Suryani, M.Kom.",
    "cover": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop",
    "category": "Teknologi Informasi",
    "year": 2022,
    "rating": 4.7,
    "downloads": 1023,
    "fileSize": "9.6 MB",
    "description": "Membahas prinsip dasar sistem operasi, manajemen proses, memori, dan file system."
  },
  {
    "id": 4,
    "title": "Basis Data Relasional",
    "author": "Yusuf Maulana, M.T.",
    "cover": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=400&fit=crop",
    "category": "Database",
    "year": 2023,
    "rating": 4.5,
    "downloads": 1789,
    "fileSize": "17.8 MB",
    "description": "Teori dan praktik penggunaan sistem manajemen basis data relasional dengan SQL."
  },
  {
    "id": 5,
    "title": "Jaringan Komputer",
    "author": "Rudi Hartono, S.Kom., M.Kom.",
    "cover": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=400&fit=crop",
    "category": "Jaringan",
    "year": 2021,
    "rating": 4.6,
    "downloads": 1423,
    "fileSize": "13.5 MB",
    "description": "Penjelasan tentang model OSI, TCP/IP, routing, serta protokol jaringan."
  },
  {
    "id": 6,
    "title": "Pemrograman Berorientasi Objek",
    "author": "Dr. Dewi Anjani",
    "cover": "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=300&h=400&fit=crop",
    "category": "Pemrograman",
    "year": 2022,
    "rating": 4.7,
    "downloads": 897,
    "fileSize": "11.9 MB",
    "description": "Konsep dasar OOP menggunakan bahasa Java, dengan studi kasus praktikal."
  }
]


  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Catalog</h1>
        <p className="text-gray-600">Browse our collection of {books.length} books</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="downloads">Downloads</SelectItem>
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
          Showing {filteredBooks.length} of {books.length} books
        </p>
      </div>

      {/* Books Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {book.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{book.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600">by {book.author}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{book.year}</span>
                    <div className="flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>{book.downloads}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link to={`/book/${book.id}`}>View Details</Link>
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
                    src={book.cover}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
                        <p className="text-gray-600">by {book.author}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{book.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        {book.category}
                      </span>
                      <span>Year: {book.year}</span>
                      <span>Size: {book.fileSize}</span>
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>{book.downloads} downloads</span>
                      </div>
                    </div>
                    <Button asChild>
                      <Link to={`/book/${book.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No books found matching your criteria.</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
