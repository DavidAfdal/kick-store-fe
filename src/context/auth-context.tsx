import React from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  status: string | null;
  setStatus: (status: string) => void;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);
