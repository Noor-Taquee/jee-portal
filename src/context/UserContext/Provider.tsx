import { useState } from "react";

import { UserContext, type User } from ".";

export const USER_NAME_KEY = "user:name";
export const USER_TOKEN_KEY = "user:token";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  function logout(save = false) {
    setUser(null);

    if (!save) {
      const token = localStorage.getItem(USER_TOKEN_KEY);
      localStorage.removeItem(USER_NAME_KEY);
      localStorage.removeItem(USER_TOKEN_KEY);
      if (token) {
        void fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {});
      }
    }
  }

  function login(newUser: User, token: string) {
    localStorage.setItem(USER_NAME_KEY, newUser.username);
    localStorage.setItem(USER_TOKEN_KEY, token);
    setUser(newUser);
  }

  const value = { user: user, logout: logout, login: login };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
