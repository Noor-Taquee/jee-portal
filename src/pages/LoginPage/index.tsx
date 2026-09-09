// oxlint-disable max-lines-per-function

import "./style.css";

import { useState } from "react";
import type { UserData } from "./data";

import Header from "./Header";
import LoginForm from "./LoginForm";
import InstituteLogo from "../../components/InstituteLogo";

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
      <InstituteLogo />

      <Header />

      <LoginForm
        userData={userData}
        setData={setUserData}
      />
    </div>
  );
}
