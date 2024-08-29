import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { GlobalContext } from './context/Context';

interface PrivateRouteProps {
  element: React.ReactElement;
  path: string;
  isAuth?: boolean;
}

function PrivateRoute({ element, path, isAuth }:PrivateRouteProps) {
  return isAuth ? element : <Navigate to="/login" />;
}
export default PrivateRoute;