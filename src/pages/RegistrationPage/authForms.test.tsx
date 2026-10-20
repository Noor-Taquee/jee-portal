import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const { fetchMock, loginMock, navigateMock } = vi.hoisted(() => ({
  fetchMock: vi.fn(),
  loginMock: vi.fn(),
  navigateMock: vi.fn(),
}));

vi.mock("../../hooks/useUser", () => ({
  useUser: () => ({ login: loginMock }),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

function setInput(container: HTMLElement, selector: string, value: string) {
  const input = container.querySelector<HTMLInputElement>(selector);
  if (!input) throw new Error(`Input not found: ${selector}`);
  fireEvent.change(input, { target: { value } });
}

function submitForm(container: HTMLElement) {
  const form = container.querySelector("form");
  if (!form) throw new Error("Form not found");
  fireEvent.submit(form);
}

function respondWith(status: number, body: Record<string, unknown>) {
  fetchMock.mockResolvedValueOnce({
    ok: status >= 200 && status < 300,
    json: () => Promise.resolve(body),
  } as Response);
}

function fillSignin(container: HTMLElement) {
  setInput(container, 'input[name="username"]', "student1");
  setInput(container, 'input[name="password"]', "password123");
}

function fillSignup(container: HTMLElement) {
  setInput(container, 'input[name="first-name"]', "Ada");
  setInput(container, 'input[name="last-name"]', "Lovelace");
  setInput(container, 'input[name="username"]', "ada123");
  setInput(container, 'input[autocomplete="new-password"]', "password123");
}

beforeEach(() => {
  fetchMock.mockReset();
  loginMock.mockReset();
  navigateMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

test("sign in logs in and navigates after a successful response", async () => {
  const { container } = render(<SigninForm />);
  fillSignin(container);
  respondWith(200, {
    success: true,
    token: "session-token",
    user: { name: "Ada Lovelace", role: "student" },
  });

  submitForm(container);

  await waitFor(() => {
    expect(loginMock).toHaveBeenCalledWith(
      { username: "student1", name: "Ada Lovelace", role: "student" },
      "session-token"
    );
    expect(navigateMock).toHaveBeenCalledWith("/home");
  });
});

test("sign in shows invalid credentials without logging in", async () => {
  const { container } = render(<SigninForm />);
  fillSignin(container);
  respondWith(401, {
    success: false,
    error: "Invalid username or password",
  });

  submitForm(container);

  expect(await screen.findByText("Invalid username or password")).toBeTruthy();
  expect(loginMock).not.toHaveBeenCalled();
  await waitFor(() => {
    expect(
      container.querySelector<HTMLButtonElement>("button[type=submit]")
        ?.disabled
    ).toBe(false);
  });
});

test("sign in shows a retry message after a network failure", async () => {
  const { container } = render(<SigninForm />);
  fillSignin(container);
  fetchMock.mockRejectedValueOnce(new Error("offline"));

  submitForm(container);

  expect(
    await screen.findByText("Unable to sign in. Please try again.")
  ).toBeTruthy();
  expect(loginMock).not.toHaveBeenCalled();
});

test("sign up logs in and navigates after a successful response", async () => {
  const { container } = render(<SignupForm />);
  fillSignup(container);
  respondWith(200, {
    success: true,
    token: "session-token",
    user: { name: "Ada Lovelace", role: "student" },
  });

  submitForm(container);

  await waitFor(() => {
    expect(loginMock).toHaveBeenCalledWith(
      { username: "ada123", name: "Ada Lovelace", role: "student" },
      "session-token"
    );
    expect(navigateMock).toHaveBeenCalledWith("/home");
  });
});

test("sign up shows a duplicate username without logging in", async () => {
  const { container } = render(<SignupForm />);
  fillSignup(container);
  respondWith(409, {
    success: false,
    error: "Username is already taken",
  });

  submitForm(container);

  expect(await screen.findByText("Username is already taken")).toBeTruthy();
  expect(loginMock).not.toHaveBeenCalled();
  expect(navigateMock).not.toHaveBeenCalled();
});

test("sign up shows a retry message after a network failure", async () => {
  const { container } = render(<SignupForm />);
  fillSignup(container);
  fetchMock.mockRejectedValueOnce(new Error("offline"));

  submitForm(container);

  expect(
    await screen.findByText("Unable to register. Please try again.")
  ).toBeTruthy();
  expect(loginMock).not.toHaveBeenCalled();
});
