
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Upload, Download, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    { icon: BookOpen, label: "Total Books", value: "12,543", change: "+5.2%" },
    { icon: Users, label: "Active Users", value: "8,921", change: "+12.3%" },
    { icon: Upload, label: "Pending Reviews", value: "47", change: "+8.1%" },
    { icon: Download, label: "Downloads Today", value: "1,234", change: "+15.7%" }
  ];

  const recentActivity = [
    { action: "New book uploaded", item: "Modern Web Development", user: "John Doe", time: "2 hours ago" },
    { action: "User registered", item: "sarah.johnson@email.com", user: "Sarah Johnson", time: "3 hours ago" },
    { action: "Book approved", item: "Introduction to AI", user: "Admin", time: "5 hours ago" },
    { action: "User reported content", item: "Book ID: 1234", user: "Mike Wilson", time: "6 hours ago" }
  ];

  const pendingActions = [
    { type: "review", title: "47 books pending review", description: "Books waiting for approval" },
    { type: "report", title: "3 content reports", description: "User reports requiring attention" },
    { type: "user", title: "12 new user registrations", description: "Users awaiting verification" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
        <p className="text-xl text-gray-600">
          Manage and monitor your digital library platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" asChild>
              <Link to="/admin/books">
                <BookOpen className="h-4 w-4 mr-2" />
                Manage Books
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/users">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/borrowing">
                <Download className="h-4 w-4 mr-2" />
                View Reports
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingActions.map((action, index) => (
              <div key={index} className="border-l-4 border-orange-400 pl-4">
                <h3 className="font-semibold text-gray-800">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-gray-600">{activity.item}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <h3 className="font-semibold text-gray-800">Server Status</h3>
              <p className="text-sm text-green-600">Online</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <h3 className="font-semibold text-gray-800">Database</h3>
              <p className="text-sm text-green-600">Connected</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
              <h3 className="font-semibold text-gray-800">Backup</h3>
              <p className="text-sm text-yellow-600">Scheduled</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
