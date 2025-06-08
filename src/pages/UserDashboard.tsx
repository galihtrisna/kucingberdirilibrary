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

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const userStats = [
    {
      icon: BookOpen,
      label: "Books Downloaded",
      value: "23",
      color: "text-blue-600",
    },
    { icon: Heart, label: "Favorites", value: "8", color: "text-red-600" },
    {
      icon: Clock,
      label: "Reading Hours",
      value: "47",
      color: "text-green-600",
    },
    {
      icon: Star,
      label: "Reviews Written",
      value: "12",
      color: "text-yellow-600",
    },
  ];

  const downloadedBooks = [
    {
      id: 1,
      title: "Struktur Data dan Algoritma",
      author: "Ir. Bambang Sutrisno, M.T.",
      cover:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&h=200&fit=crop",
      downloadDate: "2024-03-01",
      progress: 80,
      category: "Pemrograman",
    },
    {
      id: 2,
      title: "Pengantar Kecerdasan Buatan",
      author: "Dr. Rina Suryani, M.Kom.",
      cover:
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=150&h=200&fit=crop",
      downloadDate: "2024-02-27",
      progress: 50,
      category: "AI",
    },
    {
      id: 3,
      title: "Desain UI/UX untuk Pemula",
      author: "Andi Saputra",
      cover:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=200&fit=crop",
      downloadDate: "2024-02-20",
      progress: 100,
      category: "Desain",
    },
  ];

  const favoriteBooks = [
    {
      id: 1,
      title: "Pemrograman Web Lanjut",
      author: "Eka Prasetya, M.T.",
      cover:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=200&fit=crop",
      rating: 4.9,
      category: "Web Development",
    },
    {
      id: 2,
      title: "Dasar-Dasar Machine Learning",
      author: "Teguh Hariyadi",
      cover:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&h=200&fit=crop",
      rating: 4.7,
      category: "Data Science",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Downloaded",
      item: "Struktur Data dan Algoritma",
      date: "2024-03-01",
      icon: Download,
    },
    {
      id: 2,
      action: "Added to favorites",
      item: "Pemrograman Web Lanjut",
      date: "2024-02-29",
      icon: Heart,
    },
    {
      id: 3,
      action: "Reviewed",
      item: "Pengantar Kecerdasan Buatan",
      date: "2024-02-28",
      icon: Star,
    },
    {
      id: 4,
      action: "Viewed",
      item: "Desain UI/UX untuk Pemula",
      date: "2024-02-26",
      icon: Eye,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, John Doe!</p>
        </div>
        <Button asChild>
          <Link to="/profile">
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
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

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Downloads */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {downloadedBooks.slice(0, 3).map((book) => (
                    <div key={book.id} className="flex items-center space-x-3">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">
                          {book.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          by {book.author}
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
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setActiveTab("downloads")}
                >
                  View All Downloads
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.slice(0, 4).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-3"
                    >
                      <div className="bg-blue-100 rounded-full p-2">
                        <activity.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">
                          <span className="font-medium">{activity.action}</span>{" "}
                          "{activity.item}"
                        </p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setActiveTab("activity")}
                >
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Downloads Tab */}
        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle>Downloaded Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {downloadedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                    <div className="space-y-2">
                      <Badge variant="secondary">{book.category}</Badge>
                      <h3 className="font-semibold text-gray-800 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600">by {book.author}</p>
                      <p className="text-xs text-gray-500">
                        Downloaded: {book.downloadDate}
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
                        <Link to={`/book/${book.id}`}>Continue Reading</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteBooks.map((book) => (
                  <div
                    key={book.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{book.category}</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">
                            {book.rating}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-800 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600">by {book.author}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1" asChild>
                          <Link to={`/book/${book.id}`}>View Details</Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
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
                        <span className="font-medium">{activity.action}</span> "
                        {activity.item}"
                      </p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
