import "./style.css";

import { Link } from "react-router-dom";
import { LogInIcon } from "lucide-react";
import ExamCountdown from "../../../components/ExamCountdown";
import Footer from "./Footer";

export default function FeaturePage() {
  return (
    <div id="feature-page">
      <ExamCountdown />

      <Link
        to={"/registration/signup"}
        className="cta-1"
        id="register-button"
      >
        <p>Login</p>
        <LogInIcon />
      </Link>

      <Footer />
    </div>
  );
}
