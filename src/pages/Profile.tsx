import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Download,
  Star,
  Edit,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+62 123 456 7890",
    location: "Jakarta, Indonesia",
    bio: "Passionate reader and technology enthusiast. Love exploring new ideas through books and sharing knowledge with the community.",
    joinDate: "January 2024",
  });
  const { toast } = useToast();

  const userStats = [
    { icon: BookOpen, label: "Books Uploaded", value: "3" },
    { icon: Download, label: "Books Downloaded", value: "25" },
    { icon: Star, label: "Average Rating", value: "4.8" },
    { icon: User, label: "Contributions", value: "12" },
  ];

  const uploadedBooks = [
    {
      id: 1,
      title: "Modern JavaScript Guide",
      status: "approved",
      downloads: 145,
      rating: 4.9,
      uploadDate: "2024-01-10",
    },
    {
      id: 2,
      title: "React Best Practices",
      status: "pending",
      downloads: 0,
      rating: 0,
      uploadDate: "2024-01-18",
    },
    {
      id: 3,
      title: "Web Development Tips",
      status: "approved",
      downloads: 89,
      rating: 4.7,
      uploadDate: "2024-01-05",
    },
  ];

  const favoriteBooks = [
    {
      id: 1,
      title: "Pengantar Ilmu Komputer",
      author: "Dr. Sari Lestari",
      category: "Informatika",
      addedDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Dasar Digital Marketing",
      author: "Rina Kurnia",
      category: "Bisnis Digital",
      addedDate: "2024-01-12",
    },
  ];

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Profile Settings
        </h1>
        <p className="text-xl text-gray-600">
          Manage your account information and view your activity
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {profileData.name}
              </h2>
              <p className="text-gray-600 mb-4">{profileData.email}</p>
              <Badge className="bg-blue-100 text-blue-800 mb-4">
                Contributor
              </Badge>
              <Button
                size="sm"
                className="w-full"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {stat.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="uploaded">My Books</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            value={profileData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) =>
                            handleInputChange("bio", e.target.value)
                          }
                          rows={4}
                        />
                      </div>
                      <Button onClick={handleSave}>Save Changes</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Full Name</p>
                          <p className="text-gray-600">{profileData.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600">{profileData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-600">{profileData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-gray-600">
                            {profileData.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Member Since</p>
                          <p className="text-gray-600">
                            {profileData.joinDate}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Bio</p>
                        <p className="text-gray-600">{profileData.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Uploaded Books */}
            <TabsContent value="uploaded">
              <Card>
                <CardHeader>
                  <CardTitle>My Uploaded Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {uploadedBooks.map((book) => (
                      <div key={book.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">
                            {book.title}
                          </h3>
                          {getStatusBadge(book.status)}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>Uploaded: {book.uploadDate}</div>
                          <div>Downloads: {book.downloads}</div>
                          {book.rating > 0 && (
                            <div>Rating: {book.rating}/5</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favorite Books */}
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Favorite Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {favoriteBooks.map((book) => (
                      <div key={book.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {book.title}
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>by {book.author}</div>
                          <div>Category: {book.category}</div>
                          <div>Added: {book.addedDate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
