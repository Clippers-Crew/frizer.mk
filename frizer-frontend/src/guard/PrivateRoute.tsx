import { Navigate } from 'react-router-dom';

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