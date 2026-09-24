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
      <div className="change-method-container">
        <p className="change-method-text">
          {method === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        <button
          className="change-method-button"
          onClick={() =>
            setMethod((p) => (p === "signup" ? "signin" : "signup"))
          }
        >
          <span>{method === "signin" ? "Create Account" : "Sign in"}</span>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
