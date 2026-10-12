import { useState } from "react";

import { UserContext, type User } from ".";

export const userLocalStorageKey = "username";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const name = localStorage.getItem(userLocalStorageKey);

  const [user, setUser] = useState<User | null>(name ? { name } : null);

  function logout(keep = false) {
    setUser(null);
    if (!keep) {
      localStorage.removeItem(userLocalStorageKey);
    }
  }

  function login(newUser: User, save = true) {
    if (user) throw new Error("User already exists!");
    setUser(newUser);
    if (save) {
      localStorage.setItem(userLocalStorageKey, newUser.name);
    }
  }

  const value = { user: user, logout: logout, login: login };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
