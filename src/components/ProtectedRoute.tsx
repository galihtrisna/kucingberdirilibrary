
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getRoleFromToken } from '@/lib/jwt'; 

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const userRole = getRoleFromToken(); 
  const isAuthenticated = !!userRole;

  console.log("DEBUG PROTECTED ROUTE: User Role:", userRole);
  console.log("DEBUG PROTECTED ROUTE: Is Authenticated:", isAuthenticated); 
  console.log("DEBUG PROTECTED ROUTE: Allowed Roles for this route:", allowedRoles); 
  console.log("DEBUG PROTECTED ROUTE: Is User Role Included in Allowed Roles?", userRole && allowedRoles.includes(userRole)); 


  if (!isAuthenticated) {
    console.log("DEBUG PROTECTED ROUTE: User tidak terautentikasi, mengalihkan ke /auth");
    return <Navigate to="/auth" replace />;
  }

  if (userRole && allowedRoles.includes(userRole)) {
    console.log("DEBUG PROTECTED ROUTE: Role pengguna diizinkan, melanjutkan ke rute."); 
    return <Outlet />;
  } else {
   
    console.log("DEBUG PROTECTED ROUTE: Role pengguna TIDAK diizinkan, mengalihkan ke /404"); 
    return <Navigate to="/404" replace />;
  }
};

export default ProtectedRoute;  