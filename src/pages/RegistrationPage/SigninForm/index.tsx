// oxlint-disable max-lines-per-function

import { useState } from "react";
import { useUser } from "../../../hooks/useUser";

import { userLocalStorageKey } from "../../../context/UserContext/Provider";
import { changeHash } from "../../../hooks/useHash";

import { EyeIcon, EyeOffIcon, KeyRoundIcon, User2Icon } from "lucide-react";
import InputArea from "../../../components/InputArea";

export default function SigninForm() {
  const { setUser } = useUser();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  function handleRegister(e: React.SubmitEvent) {
    e.preventDefault();
    const cleanName = username.trim();

    if (cleanName.length < 2) {
      setUsernameError("Please enter a valid name (at least 2 characters).");
      return;
    }

    setUsernameError(null);
    localStorage.setItem(userLocalStorageKey, cleanName);
    setUser({ name: cleanName });

    changeHash("home");
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
          />
        </InputArea>

        <InputArea
          label="Password"
          error={null}
        >
          <span className="icon-holder">
            <KeyRoundIcon />
          </span>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            value={pass}
            onChange={(val) => {
              setPass(val.target.value);
              if (usernameError) setUsernameError("");
            }}
          />
          <button
            type="button"
            className="in-input-btn"
            onClick={() => setShowPass((p) => !p)}
          >
            {showPass ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </InputArea>

        <button
          type="submit"
          className="register-submit-btn"
        >
          <span>Log in</span>
        </button>
      </form>
    </div>
  );
}
