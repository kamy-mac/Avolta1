import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SuperAdminRouteProps {
  children: React.ReactNode;
}

export default function SuperAdminRoute({ children }: SuperAdminRouteProps) {
  const { user } = useAuth();

  if (!user || user.role !== 'superadmin') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}