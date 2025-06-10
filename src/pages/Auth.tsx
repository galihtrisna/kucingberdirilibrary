import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const API_BASE_URL = process.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/auth/accesstoken",
        {
          username: loginData.username,
          password: loginData.password,
        },
        {
          withCredentials: true,
        }
      );

      const jwtToken = response.data.data;
      localStorage.setItem("jwtToken", jwtToken);
      console.log(
        "AUTH: Token disimpan di localStorage:",
        localStorage.getItem("jwtToken")
      );
      console.log("AUTH: Panjang token:", jwtToken.length);

      window.dispatchEvent(new Event("storage"));
      console.log("AUTH: Event 'storage' dipicu.");

      toast({
        title: "Login Berhasil!",
        description: "Selamat datang kembali di KBOeL",
      });

      console.log("AUTH: Memberikan jeda sebelum navigasi...");
      setTimeout(() => {
        navigate("/catalog");
        console.log("AUTH: Navigasi ke /catalog.");
      }, 100); // Memberi jeda 100ms
    } catch (error: any) {
      let errorMessage =
        "Terjadi kesalahan yang tidak terduga. Silakan coba lagi.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          error.response.data.data ||
          error.response.data.message ||
          error.message;
        if (typeof errorMessage === "object" && errorMessage !== null) {
          errorMessage = JSON.stringify(errorMessage);
        }
      }
      console.error("AUTH: Login gagal:", errorMessage, error);
      toast({
        title: "Login Gagal",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Kesalahan",
        description: "Kata sandi tidak cocok",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("AUTH: Mengirim permintaan registrasi...");
      await api.post("/auth/register", {
        username: registerData.username,
        password: registerData.password,
        fullName: registerData.fullName,
        role: "MEMBER",
      });

      toast({
        title: "Registrasi Berhasil!",
        description: "Akun Anda telah dibuat. Anda sekarang dapat masuk.",
      });

      setRegisterData({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      console.log("AUTH: Registrasi berhasil, mereset form.");
    } catch (error: any) {
      let errorMessage = "Registrasi gagal. Silakan coba lagi.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          error.response.data.data ||
          error.response.data.message ||
          error.message;
        if (typeof errorMessage === "object" && errorMessage !== null) {
          errorMessage = JSON.stringify(errorMessage);
        }
      }
      console.error("AUTH: Registrasi gagal:", errorMessage, error);
      toast({
        title: "Registrasi Gagal",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegisterInputChange = (field: string, value: string) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 font-bold text-2xl"
          >
            <BookOpen className="h-8 w-8" />
            <span>KBOeL</span>
          </Link>
          <p className="text-gray-600 mt-2">
            Platform Perpustakaan Digital Terbuka
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Selamat Datang</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-username">Nama Pengguna</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="login-username"
                        type="text"
                        placeholder="Masukkan nama pengguna Anda"
                        value={loginData.username}
                        onChange={(e) =>
                          handleLoginInputChange("username", e.target.value)
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password">Kata Sandi</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan kata sandi Anda"
                        value={loginData.password}
                        onChange={(e) =>
                          handleLoginInputChange("password", e.target.value)
                        }
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="rounded"
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Ingat saya
                      </Label>
                    </div>
                    <Button variant="link" className="text-sm p-0">
                      Lupa kata sandi?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full">
                    Masuk
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-fullName">Nama Lengkap</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="register-fullName"
                        type="text"
                        placeholder="Nama lengkap Anda"
                        value={registerData.fullName}
                        onChange={(e) =>
                          handleRegisterInputChange("fullName", e.target.value)
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-username">Nama Pengguna</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="Pilih nama pengguna"
                        value={registerData.username}
                        onChange={(e) =>
                          handleRegisterInputChange("username", e.target.value)
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-password">Kata Sandi</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="register-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Buat kata sandi"
                        value={registerData.password}
                        onChange={(e) =>
                          handleRegisterInputChange("password", e.target.value)
                        }
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-confirm-password">
                      Konfirmasi Kata Sandi
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="Konfirmasi kata sandi Anda"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          handleRegisterInputChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Daftar
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
