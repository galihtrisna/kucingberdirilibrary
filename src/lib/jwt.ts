import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  roles?: string[];
  exp: number;
  iat: number;
}

export const getRoleFromToken = (): string | null => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.log("JWT: Token tidak ditemukan di localStorage.");
    return null;
  }
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    console.log("JWT: Token ditemukan. Kedaluwarsa UNIX (detik):", decoded.exp);
    console.log("JWT: Waktu saat ini UNIX (detik):", currentTime);
    console.log(
      "JWT: Kedaluwarsa (Tanggal/Waktu Lokal):",
      new Date(decoded.exp * 1000).toLocaleString()
    );
    console.log(
      "JWT: Saat ini (Tanggal/Waktu Lokal):",
      new Date(currentTime * 1000).toLocaleString()
    );
    console.log("JWT: Sub (username):", decoded.sub);
    console.log("JWT: Roles:", decoded.roles);

    if (decoded.exp < currentTime) {
      console.warn("JWT: Token kedaluwarsa. Menghapus token.");
      localStorage.removeItem("jwtToken");
      return null;
    }

    if (!decoded.roles || decoded.roles.length === 0) {
      console.warn("JWT: Token tidak memiliki peran. Menghapus token.");
      localStorage.removeItem("jwtToken");
      return null;
    }

    const role = decoded.roles[0]; // ambil role pertama, bisa disesuaikan
    console.log("JWT: Token valid, peran:", role);
    return role;
  } catch (error) {
    console.error("JWT: Gagal mendekode token atau token rusak:", error);
    localStorage.removeItem("jwtToken");
    return null;
  }
};
