import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { UserInfo } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
