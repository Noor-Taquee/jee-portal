// oxlint-disable max-lines-per-function

import "./style.css";

import { useState } from "react";
import type { UserData } from "../data";
import { changeHash } from "../../../hooks/useHash";

import PaswwordInput from "./PasswordInput";
import UsernameInput from "./UsernameInput";
import Keyboard from "../Keyboard";

interface LoginFormProps {
  userData: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
  setStartTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function LoginForm({ setData, setStartTime }: LoginFormProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [keyboard, setKeyboard] = useState<boolean>(false);

  return (
    <div id="login-form">
      <div className="form-header">
        <p>Login</p>
      </div>

      <div className="form-body">
        <UsernameInput
          username={username}
          setUsername={setUsername}
        />
        <PaswwordInput
          password={password}
          setPassword={setPassword}
          setKeyboard={setKeyboard}
        />

        {keyboard && <Keyboard />}

        <button
          id="login-btn"
          onClick={() => {
            if (!username) {
            } else if (!password) {
            }
            setData({ name: username, password: password });
            setStartTime(new Date());
            changeHash("question");
          }}
        >
          <p>Login</p>
        </button>

        <p id="test-time">00:00:00</p>
      </div>
    </div>
  );
}
