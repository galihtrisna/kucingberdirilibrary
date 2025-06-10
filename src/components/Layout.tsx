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
      const role = getRoleFromToken();
      setUserRole(role);
      console.log("LAYOUT: User Role setelah checkUserRole:", role);
      console.log(
        "LAYOUT: Token di localStorage saat checkUserRole:",
        localStorage.getItem("jwtToken")
      );
    };

    // Panggil sekali saat komponen dimuat
    checkUserRole();

    // Tambahkan event listener untuk mendengarkan perubahan localStorage
    const handleStorageChange = () => {
      console.log("LAYOUT: Event 'storage' terdeteksi.");
      checkUserRole();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
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
    console.log("LAYOUT: Token dihapus dari localStorage.");
    // Memicu event storage secara manual untuk memberitahu komponen lain (meskipun tidak selalu diperlukan jika hanya satu tab)
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-blue-600 font-bold text-xl"
            >
              <BookOpen className="h-8 w-8" />
              <span>KBOeL</span>
            </Link>

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
              {userRole === "LIBRARIAN" && (
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

            <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari buku, penulis..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-300"
                />
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {userRole ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard">
                      <User className="h-4 w-4 mr-2" />
                      Dasbor
                    </Link>
                  </Button>
                  <Button size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </Button>
                </>
              ) : (
                <Button size="sm" asChild>
                  <Link to="/auth">Masuk</Link>
                </Button>
              )}
            </div>

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

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari buku..."
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
                {userRole === "LIBRARIAN" && (
                  <Link
                    to="/admin"
                    className="block text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex space-x-2 pt-2">
                  {userRole === "MEMBER" ? (
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
                          Dasbor
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={handleLogout}
                      >
                        Keluar
                      </Button>
                    </>
                  ) : userRole === "LIBRARIAN" ? null : (
                    <Button size="sm" className="flex-1" asChild>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        Masuk
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
                <BookOpen className="h-6 w-6" />
                <span>KBOeL</span>
              </div>
              <p className="text-gray-600 text-sm">
                Platform perpustakaan terbuka digital untuk semua orang. Akses
                ribuan buku, makalah penelitian, dan materi pendidikan.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Tautan Cepat</h3>
              <div className="space-y-2">
                <Link
                  to="/catalog"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Jelajahi Katalog
                </Link>
                <Link
                  to="/about"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Tentang Kami
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Kontak
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Hukum</h3>
              <div className="space-y-2">
                <Link
                  to="/legal"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Ketentuan Layanan
                </Link>
                <Link
                  to="/legal"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Kebijakan Privasi
                </Link>
                <Link
                  to="/legal"
                  className="block text-gray-600 hover:text-blue-600 text-sm"
                >
                  Kebijakan Hak Cipta
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Info Kontak</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: info@kboel.com</p>
                <p>Telepon: +62 123 456 7890</p>
                <p>Alamat: Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2024 KucingBerdiri OpenLibrary (KBOeL). Hak cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
