// oxlint-disable max-lines-per-function

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";

import {
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon,
  LoaderIcon,
  User2Icon,
} from "lucide-react";
import InputArea from "../../../components/InputArea";

const MIN_USERNAME_LENGTH = 2;
const MAX_USERNAME_LENGTH = 16;
const MIN_PASSWORD_LENGTH = 8;

export default function SignupForm() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  function handleRegister(e: React.SubmitEvent) {
    e.preventDefault();

    setLoading(true);

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    if (cleanFirstName.length < 1 && cleanLastName.length > 1) {
      setFirstNameError("First name cannot be empty");
      setLoading(false);
      return;
    }

    const cleanName = cleanFirstName + " " + cleanLastName;
    if (cleanName.length < 1) {
      setFirstNameError("Please enter your name");
      setLoading(false);
      return;
    }

    const cleanUsername = username.trim();
    if (cleanUsername.length < MIN_USERNAME_LENGTH) {
      setUsernameError(
        `Username is too short (minimum ${MIN_USERNAME_LENGTH} characters).`
      );
      setLoading(false);
      return;
    } else if (cleanUsername.length > MAX_USERNAME_LENGTH) {
      setUsernameError(
        `Username is too long (maximum ${MAX_USERNAME_LENGTH} characters).`
      );
      setLoading(false);
      return;
    }

    const cleanPassword = password.trim();
    if (cleanPassword.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
      );
      setLoading(false);
      return;
    }

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cleanName,
        username: cleanUsername,
        password: cleanPassword,
      }),
    })
      .then(async (response) => {
        const data: {
          success?: boolean;
          token?: string;
          user?: {
            name: string;
            role: "student" | "maintainer" | "admin";
          };
          error?: string;
        } = await response.json();

        if (!response.ok || !data.success || !data.token || !data.user) {
          throw new Error(data.error ?? "Unable to sign in");
        }

        login(
          {
            username: cleanUsername,
            name: data.user.name,
            role: data.user.role,
          },
          data.token
        );
        navigate("/home");
      })
      .catch((error: unknown) => {
        if (
          error instanceof Error &&
          error.message === "Invalid username or password"
        ) {
          setUsernameError(error.message);
        }
        if (
          error instanceof Error &&
          error.message === "Username is already taken"
        ) {
          setUsernameError(error.message);
        } else setUsernameError("Unable to register. Please try again.");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="registration-form-card">
      <div className="form-header">
        <p>Create Account</p>
      </div>

      <form
        className="form-body"
        onSubmit={handleRegister}
      >
        <div className="row-input-holder">
          <InputArea
            label="First name"
            error={firstNameError}
          >
            <input
              type="text"
              name="first-name"
              autoComplete="given-name"
              onChange={(val) => {
                setFirstName(val.target.value);
                if (firstNameError) setFirstNameError("");
              }}
              readOnly={loading}
            />
          </InputArea>
          <InputArea
            label="Last name"
            error={null}
          >
            <input
              type="text"
              name="last-name"
              autoComplete="family-name"
              onChange={(val) => {
                setLastName(val.target.value);
              }}
              readOnly={loading}
            />
          </InputArea>
        </div>
        <InputArea
          label="Username"
          error={usernameError}
        >
          <span className="icon-holder">
            <User2Icon />
          </span>
          <input
            type="text"
            name="username"
            autoComplete="off"
            value={username}
            onChange={(val) => {
              const value = val.target.value.trim();

              if (value.length > MAX_USERNAME_LENGTH) {
                setUsername(value.slice(0, MAX_USERNAME_LENGTH));
              } else {
                setUsername(value);
              }
              if (usernameError) setUsernameError("");
            }}
            readOnly={loading}
          />
          <span className="icon-holder">
            <span id="username-length">
              {username.length}/{MAX_USERNAME_LENGTH}
            </span>
          </span>
        </InputArea>

        <InputArea
          label="Create Password"
          error={passwordError}
        >
          <span className="icon-holder">
            <KeyRoundIcon />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            autoComplete="new-password"
            onChange={(val) => {
              setPassword(val.target.value);
              if (passwordError) setPasswordError("");
            }}
            readOnly={loading}
          />
          <button
            type="button"
            className="in-input-btn"
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </InputArea>

        <button
          type="submit"
          className="register-submit-btn"
          disabled={loading}
        >
          {loading ? <LoaderIcon /> : <span>Complete Registration</span>}
        </button>
      </form>
    </div>
  );
}
