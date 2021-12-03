import { Navigate, useLocation } from 'react-router-dom';
import { IUser } from './interfaces';

const PrivateRoute = ({ children, user }: { children: JSX.Element; user: IUser }) => {
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
