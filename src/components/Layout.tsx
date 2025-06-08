import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, User, Menu, X, LogOut } from "lucide-react";
import { getRoleFromToken } from "@/lib/jwt"; 
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";
  const [userRole, setUserRole] = useState<string | null>(null); 

  useEffect(() => {
  
    const checkUserRole = () => {
      setUserRole(getRoleFromToken());
    };
    checkUserRole(); 
    window.addEventListener("storage", checkUserRole); 
    return () => {
      window.removeEventListener("storage", checkUserRole);
    };
  }, [location.pathname]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/catalog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); 
    setUserRole(null);
  
    window.location.href = "/auth"; 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-blue-600 font-bold text-xl"
            >
              <BookOpen className="h-8 w-8" />
              <span>KBOeL</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-600 hover:text-blue-600 transition-colors ${
                    location.pathname === item.path
                      ? "text-blue-600 font-medium"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {userRole === "ROLE_LIBRARIAN" && ( // Tampilkan menu Admin hanya untuk LIBRARIAN
                <Link
                  to="/admin"
                  className={`text-gray-600 hover:text-blue-600 transition-colors ${
                    location.pathname.startsWith("/admin")
                      ? "text-blue-600 font-medium"
                      : ""
                  }`}
                >
                  Admin
                </Link>
              )}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search books, authors..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-300"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {userRole ? ( // Jika sudah login (userRole ada)
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                // Jika belum login
                <Button size="sm" asChild>
                  <Link to="/auth">Login</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search books..."
                    className="pl-10 bg-gray-50 border-gray-200"
                  />
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {userRole === "ROLE_LIBRARIAN" && ( 
                  <Link
                    to="/admin"
                    className="block text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex space-x-2 pt-2">
                  {userRole ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link
                          to="/dashboard"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="flex-1" asChild>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
                <BookOpen className="h-6 w-6" />
                <span>KBOeL</span>
              </div>
              <p className="text-gray-600 text-sm">
                Digital open library platform for everyone. Access thousands of
                books, research papers, and educational materials.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/catalog"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Browse Catalog
                </Link>
                {/* <Link to="/upload" className="block text-gray-600 hover:text-blue-600 text-sm">Upload Book</Link> */}
                <Link
                  to="/about"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
              <div className="space-y-2">
                <Link
                  to="/legal"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/legal"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/legal"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Copyright Policy
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Contact Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: info@kboel.com</p>
                <p>Phone: +62 123 456 7890</p>
                <p>Address: Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2024 KucingBerdiri OpenLibrary (KBOeL). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
