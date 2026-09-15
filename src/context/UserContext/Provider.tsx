import { useState } from "react";

import { UserContext, type User } from ".";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const value = { user: user, setUser: setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
