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

export default function SigninForm() {
  const { login } = useUser();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  function handleRegister(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);

    const cleanUsername = username.trim();
    if (cleanUsername.length < 2) {
      setUsernameError("Please enter a valid name (at least 2 characters).");
      setLoading(false);
      return;
    }

    const cleanPassword = password.trim();
    if (cleanPassword.length < 2) {
      setPasswordError("Please enter password");
      setLoading(false);
      return;
    }

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
        void navigate("/home");
      })
      .catch((error: unknown) => {
        if (
          error instanceof Error &&
          error.message === "Invalid username or password"
        ) {
          setUsernameError(error.message);
        } else {
          setUsernameError("Unable to sign in. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="registration-form-card">
      <div className="form-header">
        <p>Login</p>
      </div>

      <form
        className="form-body"
        onSubmit={handleRegister}
      >
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
            autoComplete="username"
            value={username}
            onChange={(val) => {
              setUsername(val.target.value);
              if (usernameError) setUsernameError("");
            }}
            readOnly={loading}
          />
        </InputArea>

        <InputArea
          label="Password"
          error={passwordError}
        >
          <span className="icon-holder">
            <KeyRoundIcon />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(val) => {
              setPassword(val.target.value);
              if (passwordError !== null && passwordError.length > 0)
                setPasswordError("");
            }}
            readOnly={loading}
          />
          <button
            type="button"
            className="in-input-btn"
            onClick={() => {
              setShowPassword((p) => !p);
            }}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </InputArea>

        <button
          type="submit"
          className="register-submit-btn"
          disabled={loading}
        >
          {loading ? <LoaderIcon className="spin" /> : <span>Log in</span>}
        </button>
      </form>
    </div>
  );
}
