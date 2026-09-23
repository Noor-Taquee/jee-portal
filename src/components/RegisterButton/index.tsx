import "./style.css";

import { changeHash } from "../../hooks/useHash";

import { LogInIcon } from "lucide-react";

export default function RegisterButton() {
  return (
    <button
      id="register-button"
      onClick={() => {
        changeHash("registration");
      }}
    >
      <p>Register / Login</p>
      <LogInIcon />
    </button>
  );
}
