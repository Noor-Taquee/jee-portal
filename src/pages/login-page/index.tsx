// oxlint-disable max-lines-per-function
import { useState } from "react";

import "./style.css";

import Header from "./Header";
import LoginForm from "./LoginForm";
import type { UserData } from "./data";

export default function LoginPage() {
  const [userData, setUserData] = useState<UserData>({
    name: null,
    password: null,
  });

  return (
    <div
      className="app-panel"
      id="login-page"
    >
      <div className="logo-div">
        <img />
      </div>

      <Header />

      <LoginForm
        userData={userData}
        setData={setUserData}
      />
    </div>
  );
}
