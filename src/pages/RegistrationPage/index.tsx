// oxlint-disable max-lines-per-function
import "./style.css";

import { useState } from "react";
import { useUser, SignIn, SignUp } from "@clerk/react";
import { useNavigate } from "react-router-dom";

import DialogueBox from "../../components/DialogueBox";
import ActionBtn from "../../components/ActionBtn";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  // Track whether to show Sign In or Sign Up inside this container view
  const [method, setMethod] = useState<"signin" | "signup">("signup");

  // If already logged in, show the dialogue box
  if (isSignedIn) {
    return (
      <DialogueBox
        header="Already Logged In"
        texts={[
          `Logged in as ${user?.fullName || user?.primaryEmailAddress?.emailAddress}. Logout first to create a new account.`,
        ]}
      >
        <ActionBtn onClick={() => void navigate("/home")}>
          <p>Back</p>
        </ActionBtn>
      </DialogueBox>
    );
  }

  return (
    <div
      id="registration-page"
      className="app-panel"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Render Clerk's fully-styled native components */}
      {method === "signin" ? (
        <SignIn routing="hash" />
      ) : (
        <SignUp routing="hash" />
      )}

      {/* Optional: You can keep your custom toggle button or let Clerk handle it
          inside its own card footer. If you prefer your custom button below: */}
      <div className="change-method-container">
        <p className="change-method-text">
          {method === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        <button
          className="change-method-button"
          onClick={() => {
            setMethod((p) => (p === "signup" ? "signin" : "signup"));
          }}
        >
          <span>{method === "signin" ? "Create Account" : "Sign in"}</span>
        </button>
      </div>
    </div>
  );
}
