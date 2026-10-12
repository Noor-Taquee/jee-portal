import { createContext } from "react";

export type User = {
  name: string;
};

export type UserContextType = {
  user: User | null;

  /** Logs in a user, optionally saving their credentials. */
  login: (newUser: User, save?: boolean) => void;

  /** Logs out the user, optionally keeping their credentials. */
  logout: (keep?: boolean) => void;
};

export const UserContext = createContext<UserContextType | null>(null);
