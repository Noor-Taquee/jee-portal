// oxlint-disable max-lines-per-function

import "./style.css";

import { useState } from "react";
import type { UserData } from "./data";

import Header from "./Header";
import LoginForm from "./LoginForm";
import InstituteLogo from "../../components/InstituteLogo";

interface LoginPageProps {
  setStartTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function LoginPage({ setStartTime }: LoginPageProps) {
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
        setStartTime={setStartTime}
      />
    </div>
  );
}
