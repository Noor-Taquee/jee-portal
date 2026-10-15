import { createContext } from "react";

export type User = {
  name: string;
  username: string;
  role: "student" | "maintainer" | "admin";
};

export type UserContextType = {
  user: User | null;

  /** Logs in the `newUser` and saves the `sessionToken` in `localStorage`. */
  login: (newUser: User, sessionToken: string) => void;

  /** Logs out the user, optionally keeping their credentials. */
  logout: (keep?: boolean) => void;
};

export const UserContext = createContext<UserContextType | null>(null);
