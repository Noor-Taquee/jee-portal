import "./style.css";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      id="app-footer"
      className="app-footer border-t border-slate-800 py-6 mt-auto text-center text-sm text-slate-400"
    >
      <div className="copyright-div">
        <h2>JEE Portal</h2>
        <p id="copyright">&copy; 2026 JEE Portal. All rights reserved.</p>
      </div>

      <div>
        <div className="link-container">
          <strong>Terms and Policies</strong>
          <div className="link-scroll">
            <Link
              to="/legal/disclaimer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Disclaimer
            </Link>
            <Link
              to="/legal/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>
            <Link
              to="/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
