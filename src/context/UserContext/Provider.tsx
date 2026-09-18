import { useState } from "react";

import { UserContext, type User } from ".";

export const userLocalStorageKey = "username";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const name = localStorage.getItem(userLocalStorageKey);

  const [user, setUser] = useState<User | null>(name ? { name } : null);

  const value = { user: user, setUser: setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
