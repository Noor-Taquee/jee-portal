// oxlint-disable max-lines-per-function
import "./style.css";

import { useState } from "react";
import { useUser } from "../../hooks/useUser";

import { ArrowRight } from "lucide-react";
import DialogueBox from "../../components/DialogueBox";
import ActionBtn from "../../components/ActionBtn";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";

export default function RegistrationPage() {
  const { user } = useUser();

  const [method, setMethod] = useState<"signin" | "signup">("signup");

  if (user) {
    return (
      <DialogueBox
        header="Already Logged In"
        texts={[
          `Logged in as ${user.name}. Logout first to create a new account.`,
        ]}
      >
        <ActionBtn onClick={() => history.back()}>
          <p>Back</p>
        </ActionBtn>
      </DialogueBox>
    );
  }

  return (
    <div
      id="registration-page"
      className="app-panel"
    >
      {method === "signin" ? <SigninForm /> : <SignupForm />}
      {method === "signin" && (
        <div className="change-method-container">
          <p className="change-method-text">{"Don't have an account?"}</p>
          <button
            className="change-method-button"
            onClick={() => setMethod("signup")}
          >
            <span>Create Account</span>
            <ArrowRight />
          </button>
        </div>
      )}
      {method === "signup" && (
        <div className="change-method-container">
          <p className="change-method-text">Already have an account?</p>
          <button
            className="change-method-button"
            onClick={() => setMethod("signin")}
          >
            <span>Sign in</span>
            <ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
