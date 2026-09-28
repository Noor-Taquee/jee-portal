import "./style.css";

import { LogInIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterButton() {
  return (
    <Link
      to={"registration"}
      id="register-button"
    >
      <p>Register / Login</p>
      <LogInIcon />
    </Link>
  );
}
