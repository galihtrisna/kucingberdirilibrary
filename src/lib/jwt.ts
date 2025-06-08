import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

export const getRoleFromToken = (): string | null => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    return null;
  }
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem('jwtToken');
      return null;
    }

    if (!decoded.role) {
      localStorage.removeItem('jwtToken');
      return null;
    }

    return decoded.role;
  } catch (error) {
    localStorage.removeItem('jwtToken');
    return null;
  }
};
