import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../utils/AuthContext"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProtectedRoutes = ({allowedRoles}) => {
    const { auth } = useAuth();
    console.log("Protected Routes auth State: ", auth);

    if (auth.loading) return <Skeleton />;

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if(!allowedRoles.includes(auth.user?.role)) {
        console.log("User role not allowed: ", auth.user);
        return <Navigate to="/login" replace />;
    }
  return <Outlet />;
}

export default ProtectedRoutes;
