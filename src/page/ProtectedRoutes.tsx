import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

interface ProtectedRouteProps {
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
  const context = React.useContext(AuthContext);
  const location = useLocation();
  
  if (!context) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!context.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  if (context.role) {
      if (roles && !roles.includes(context.role)) {
        return <Navigate to="/" />;
      }
  }

  return <Outlet />;
};

export default ProtectedRoute;