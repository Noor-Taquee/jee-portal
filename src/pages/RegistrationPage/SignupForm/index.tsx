// oxlint-disable max-lines-per-function

import { useState } from "react";
import { useUser } from "../../../hooks/useUser";

import { userLocalStorageKey } from "../../../context/UserContext/Provider";
import { changeHash } from "../../../hooks/useHash";

import { EyeIcon, EyeOffIcon, KeyRoundIcon, User2Icon } from "lucide-react";
import InputArea from "../../../components/InputArea";

const MIN_USERNAME_LENGTH = 2;
const MAX_USERNAME_LENGTH = 16;

export default function SignupForm() {
  const { setUser } = useUser();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  function handleRegister(e: React.SubmitEvent) {
    e.preventDefault();
    const cleanName = username.trim();

    if (cleanName.length < MIN_USERNAME_LENGTH) {
      setUsernameError(
        `Username is too short (minimum ${MIN_USERNAME_LENGTH} characters).`
      );
      return;
    } else if (cleanName.length > MAX_USERNAME_LENGTH) {
      setUsernameError(
        `Username is too long (maximum ${MAX_USERNAME_LENGTH} characters).`
      );
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
        <p>Create Account</p>
      </div>

      <form
        className="form-body"
        onSubmit={handleRegister}
      >
        <div className="row-input-holder">
          <InputArea
            label="First name"
            error={null}
          >
            <input
              type="text"
              name="first-name"
              autoComplete="given-name"
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
            autoComplete="username"
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
          />
          <span className="icon-holder">
            <span id="username-length">
              {username.length}/{MAX_USERNAME_LENGTH}
            </span>
          </span>
        </InputArea>

        <InputArea
          label="Create Password"
          error={passError}
        >
          <span className="icon-holder">
            <KeyRoundIcon />
          </span>
          <input
            type={showPass ? "text" : "password"}
            value={pass}
            autoComplete="new-password"
            onChange={(val) => {
              setPass(val.target.value);
              if (passError) setPassError("");
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
          <span>Complete Registration</span>
        </button>
      </form>
    </div>
  );
}
