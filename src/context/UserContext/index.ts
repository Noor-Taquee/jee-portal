import { createContext } from "react";

export type User = {
  name: string;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<UserContextType["user"]>>;
};

export const UserContext = createContext<UserContextType | null>(null);
