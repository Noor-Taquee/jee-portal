// oxlint-disable max-lines-per-function

import "./style.css";

import { useState } from "react";
import { useExamSession } from "../../../hooks/useExamSession";
import { useNavigate } from "react-router-dom";

import PaswwordInput from "./PasswordInput";
import UsernameInput from "./UsernameInput";

export default function LoginForm() {
  const navigate = useNavigate();
  const examSession = useExamSession();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
        />

        <button
          id="login-btn"
          className={examSession.examData ? "" : "inactive"}
          onClick={() => {
            if (!examSession.examData) return;
            examSession.setStartedAt(new Date());
            navigate("/exam/questions");
          }}
        >
          <p>Start Test</p>
        </button>

        <p id="test-time">00:00:00</p>
      </div>
    </div>
  );
}
