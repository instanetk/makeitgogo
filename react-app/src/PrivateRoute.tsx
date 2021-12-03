import { Navigate, useLocation } from 'react-router-dom';
import { UserInfo } from 'firebase/auth';

type User = UserInfo | null;

const PrivateRoute = ({ children, user }: { children: JSX.Element; user: User }) => {
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
