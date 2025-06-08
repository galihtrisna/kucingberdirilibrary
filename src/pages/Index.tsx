import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Download, Star } from "lucide-react";

const Index = () => {
  const featuredBooks = [
    {
      id: 1,
      title: "Pengantar Ilmu Komputer",
      author: "Dr. Sari Lestari",
      cover:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=400&fit=crop",
      category: "Informatika",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Pemrograman Web Modern",
      author: "Budi Santoso",
      cover:
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=400&fit=crop",
      category: "Pemrograman",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Dasar Digital Marketing",
      author: "Rina Kurnia",
      cover:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop",
      category: "Bisnis Digital",
      rating: 4.7,
    },
  ];

  const stats = [
    { icon: BookOpen, label: "Total Books", value: "12,543" },
    { icon: Users, label: "Active Users", value: "8,921" },
    { icon: Download, label: "Downloads", value: "45,672" },
    { icon: Star, label: "Average Rating", value: "4.8" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Welcome to KBOeL
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your digital gateway to knowledge. Access thousands of books,
            research papers, and educational materials in our open library
            platform designed for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/catalog">Explore Books</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link to="/auth">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
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
      </section>

      {/* Featured Books */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Featured Books
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and recently added books across various
            categories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <Card
              key={book.id}
              className="group hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-0"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {book.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {book.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600">by {book.author}</p>
                  <Button className="w-full mt-4" asChild>
                    <Link to={`/book/${book.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/catalog">View All Books</Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Why Choose KBOeL?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Vast Collection</h3>
                    <p className="text-white/80">
                      Access thousands of books across all genres and subjects
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Community Driven</h3>
                    <p className="text-white/80">
                      Built by readers, for readers with community contributions
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <Download className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Free Access</h3>
                    <p className="text-white/80">
                      Download and read books completely free of charge
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
                alt="Digital Library"
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
