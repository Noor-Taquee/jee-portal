// oxlint-disable max-lines-per-function

import "./style.css";

import { useUser } from "../../hooks/useUser";

import { changeHash } from "../../hooks/useHash";

import Header from "./Header";
import LoginForm from "./LoginForm";
import InstituteLogo from "../../components/InstituteLogo";
import DialogueBox from "../../components/DialogueBox";
import ActionBtn from "../../components/ActionBtn";

export default function LoginPage() {
  const { user } = useUser();

  if (!user) {
    return (
      <DialogueBox
        header="No user was found"
        texts={["Create or login to your account first"]}
      >
        <ActionBtn
          title="Registration page"
          className="sec"
          onClick={() => {
            changeHash("registration");
          }}
        >
          <p>Login</p>
        </ActionBtn>
        <ActionBtn
          title="Back"
          onClick={() => {
            window.history.back();
          }}
        >
          <p>Back</p>
        </ActionBtn>
      </DialogueBox>
    );
  }

  return (
    <div
      className="app-panel"
      id="login-page"
    >
      <InstituteLogo />

      <Header />

      <LoginForm />
    </div>
  );
}
