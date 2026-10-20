// oxlint-disable max-lines-per-function

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext, type User } from ".";

export const USER_NAME_KEY = "user:username";
export const USER_SESSION_TOKEN_KEY = "user:session_token";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const navigate = useNavigate();

  const [loadingSession, setLoadingSession] = useState(() =>
    Boolean(
      localStorage.getItem(USER_NAME_KEY) &&
      localStorage.getItem(USER_SESSION_TOKEN_KEY)
    )
  );

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!loadingSession) return;

    const username = localStorage.getItem(USER_NAME_KEY);
    const sessionToken = localStorage.getItem(USER_SESSION_TOKEN_KEY);
    if (!username || !sessionToken) return;

    fetch("/api/auth/session", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then(async (response) => {
        const data: {
          success?: boolean;
          user?: User;
          error?: string;
        } = await response.json();

        if (!response.ok || !data.success || !data.user) {
          throw new Error(data.error);
        }

        login(data.user, sessionToken);
      })
      .catch(() => {
        localStorage.removeItem(USER_NAME_KEY);
        localStorage.removeItem(USER_SESSION_TOKEN_KEY);
        navigate("/registration");
      })
      .finally(() => {
        setLoadingSession(false);
      });
  }, [loadingSession, navigate]);

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

  const value = {
    user: user,
    loadingSession: loadingSession,
    logout: logout,
    login: login,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
