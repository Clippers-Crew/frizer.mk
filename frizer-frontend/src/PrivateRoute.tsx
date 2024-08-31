import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { GlobalContext } from './context/Context';

interface PrivateRouteProps {
  element: React.ReactElement;
  path: string;
}

function PrivateRoute({ element, path }:PrivateRouteProps) {
  const auth = localStorage.getItem("token")!=null;
  return auth ? element : <Navigate to="/login" />;
}
export default PrivateRoute;