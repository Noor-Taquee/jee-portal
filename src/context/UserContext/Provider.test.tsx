import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { useUser } from "../../hooks/useUser";
import UserProvider, { USER_NAME_KEY, USER_TOKEN_KEY } from "./Provider";

const fetchMock = vi.fn();

function UserStatus() {
  const { user, isRestoring, sessionRestoreFailed } = useUser();

  if (isRestoring) return <p>Restoring</p>;
  if (sessionRestoreFailed) return <p>Restore failed</p>;
  return <p>{user ? `${user.username}:${user.role}` : "Signed out"}</p>;
}

beforeEach(() => {
  localStorage.clear();
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.clear();
});

test("restores the user from a valid saved session", async () => {
  localStorage.setItem(USER_TOKEN_KEY, "saved-token");
  fetchMock.mockResolvedValueOnce({
    ok: true,
    json: () =>
      Promise.resolve({
        success: true,
        user: {
          name: "Ada Lovelace",
          username: "ada123",
          role: "student",
        },
      }),
  });

  render(
    <UserProvider>
      <UserStatus />
    </UserProvider>
  );

  expect(await screen.findByText("ada123:student")).toBeTruthy();
  expect(fetchMock).toHaveBeenCalledWith("/api/auth/session", {
    headers: { Authorization: "Bearer saved-token" },
  });
});

test("clears a saved token when the server rejects the session", async () => {
  localStorage.setItem(USER_NAME_KEY, "Ada Lovelace");
  localStorage.setItem(USER_TOKEN_KEY, "expired-token");
  fetchMock.mockResolvedValueOnce({
    ok: false,
    status: 401,
    json: () => Promise.resolve({ success: false, error: "Invalid session" }),
  });

  render(
    <UserProvider>
      <UserStatus />
    </UserProvider>
  );

  expect(await screen.findByText("Restore failed")).toBeTruthy();
  expect(localStorage.getItem(USER_NAME_KEY)).toBeNull();
  expect(localStorage.getItem(USER_TOKEN_KEY)).toBeNull();
});

test("keeps a saved token when session validation is temporarily unavailable", async () => {
  localStorage.setItem(USER_TOKEN_KEY, "saved-token");
  fetchMock.mockRejectedValueOnce(new Error("offline"));

  render(
    <UserProvider>
      <UserStatus />
    </UserProvider>
  );

  expect(await screen.findByText("Restore failed")).toBeTruthy();
  expect(localStorage.getItem(USER_TOKEN_KEY)).toBe("saved-token");
});
