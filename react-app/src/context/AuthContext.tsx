import React from 'react';
import { UserInfo } from 'firebase/auth';

// export interface User extends UserInfo

export const AuthContext = React.createContext<UserInfo | null>(null);
