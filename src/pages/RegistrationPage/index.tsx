// oxlint-disable max-lines-per-function

import "./style.css";

import { useUser, SignIn, SignUp } from "@clerk/react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import DialogueBox from "../../components/DialogueBox";
import ActionBtn from "../../components/ActionBtn";
import { LoaderIcon } from "lucide-react";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

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
    >
      <Routes>
        <Route
          path="signin/*"
          element={
            <SignIn
              routing="path"
              path="/registration/signin"
              signUpUrl="/registration/signup"
              fallback={<LoaderIcon className="spin" />}
            />
          }
        />
        <Route
          path="signup/*"
          element={
            <SignUp
              routing="path"
              path="/registration/signup"
              signInUrl="/registration/signin"
              fallback={<LoaderIcon className="spin" />}
            />
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to={"signup"}
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}
