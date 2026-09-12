// oxlint-disable max-lines-per-function

import "./style.css";

import { useState } from "react";
import { useExamSession } from "../../../hooks/useExamSession";

import type { UserData } from "../data";
import { getQuestions } from "../../../core/data";
import { generateResponse } from "../../../services";
import { changeHash } from "../../../hooks/useHash";

import PaswwordInput from "./PasswordInput";
import UsernameInput from "./UsernameInput";
import Keyboard from "../Keyboard";

interface LoginFormProps {
  userData: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
}

export default function LoginForm({ setData }: LoginFormProps) {
  const examSession = useExamSession();

  getQuestions().then((data) => {
    examSession.setExamData(data);
    examSession.setCandidateResponse(generateResponse(data.questions));
  });

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
          className={examSession.examData ? "" : "inactive"}
          onClick={() => {
            if (!username) {
            } else if (!password) {
            }
            setData({ name: username, password: password });
            if (!examSession.examData) return;
            examSession.setStartedAt(new Date());
            changeHash("question");
          }}
        >
          <p>Start Test</p>
        </button>

        <p id="test-time">00:00:00</p>
      </div>
    </div>
  );
}
