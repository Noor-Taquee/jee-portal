import "./style.css";

import { useUser } from "../../../hooks/useUser";

import { Link } from "react-router-dom";
import Header from "./Header";
import LoginForm from "./LoginForm";
import InstituteLogo from "../../../components/InstituteLogo";
import DialogBox from "../../../components/DialogBox";

export default function LoginPage() {
  const { user } = useUser();

  if (!user) {
    return (
      <DialogBox
        header="No user was found"
        texts={["Create or login to your account first"]}
      >
        <Link
          to={"/registration"}
          title="Registration page"
          className="action-btn sec"
        >
          <p>Login</p>
        </Link>
        <Link
          to={""}
          title="Back"
          className="action-btn"
        >
          <p>Back</p>
        </Link>
      </DialogBox>
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
