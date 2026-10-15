import { useState } from "react";

import { UserContext, type User } from ".";

export const USER_NAME_KEY = "user:name";
export const USER_SESSION_TOKEN_KEY = "user:session_token";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  function logout(save = false) {
    setUser(null);

    if (!save) {
      const sessionToken = localStorage.getItem(USER_SESSION_TOKEN_KEY);
      localStorage.removeItem(USER_NAME_KEY);
      localStorage.removeItem(USER_SESSION_TOKEN_KEY);
      if (sessionToken) {
        void fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${sessionToken}` },
        }).catch(() => {});
      }
    }
  }

  function login(newUser: User, sessionToken: string) {
    localStorage.setItem(USER_NAME_KEY, newUser.username);
    localStorage.setItem(USER_SESSION_TOKEN_KEY, sessionToken);
    setUser(newUser);
  }

  const value = { user: user, logout: logout, login: login };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
