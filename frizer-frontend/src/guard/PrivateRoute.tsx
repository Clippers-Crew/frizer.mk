import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { GlobalContext } from '../context/Context';

interface PrivateRouteProps {
  element: React.ReactElement;
  path: string;
  isAuth?: boolean;
}

function PrivateRoute({ element, path, isAuth }: PrivateRouteProps) {
  const auth = localStorage.getItem("token") != null;
  return (
    <>
      {auth ? element : <Navigate to="/login" />}
    </>
  );
}
export default PrivateRoute;