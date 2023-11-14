import React from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  userId: number | null;
  login: (userId: number) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);
