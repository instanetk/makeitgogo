import { createContext } from 'react';
import { UserInfo } from 'firebase/auth';

export const AuthContext = createContext<UserInfo | null>(null);
