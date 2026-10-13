// oxlint-disable max-lines-per-function

import { useEffect, useState } from "react";

import { UserContext, type User } from ".";

export const USER_NAME_KEY = "user:name";
export const USER_TOKEN_KEY = "user:token";

class InvalidSavedSessionError extends Error {}

async function restoreSavedSession(token: string): Promise<User> {
  const response = await fetch("/api/auth/session", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    throw new InvalidSavedSessionError("Saved session is invalid");
  }
  if (!response.ok) throw new Error("Unable to restore saved session");

  const data: { success?: boolean; user?: User } = await response.json();
  if (!data.success || !data.user) {
    throw new Error("Invalid session response");
  }

  return data.user;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isRestoring, setIsRestoring] = useState(() =>
    Boolean(localStorage.getItem(USER_TOKEN_KEY))
  );
  const [sessionRestoreFailed, setSessionRestoreFailed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    if (!token) return;

    let isCurrent = true;

    restoreSavedSession(token)
      .then((restoredUser) => {
        if (isCurrent) setUser(restoredUser);
      })
      .catch((error: unknown) => {
        if (!isCurrent) return;
        setSessionRestoreFailed(true);
        if (error instanceof InvalidSavedSessionError) {
          localStorage.removeItem(USER_NAME_KEY);
          localStorage.removeItem(USER_TOKEN_KEY);
        }
      })
      .finally(() => {
        if (isCurrent) setIsRestoring(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  function logout(save = false) {
    setUser(null);
    if (!save) {
      localStorage.removeItem(USER_NAME_KEY);
      localStorage.removeItem(USER_TOKEN_KEY);
    }
  }

  function login(newUser: User, token: string) {
    localStorage.setItem(USER_NAME_KEY, newUser.name);
    localStorage.setItem(USER_TOKEN_KEY, token);
    setSessionRestoreFailed(false);
    setUser(newUser);
  }

  const value = { user, isRestoring, sessionRestoreFailed, logout, login };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
