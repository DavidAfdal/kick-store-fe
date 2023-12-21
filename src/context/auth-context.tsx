import React from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);
