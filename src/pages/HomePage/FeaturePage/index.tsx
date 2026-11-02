import "./style.css";

import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, CheckCircle2, Timer } from "lucide-react";
import ExamCountdown from "../../../components/ExamCountdown";
import Footer from "./Footer";

export default function FeaturePage() {
  return (
    <div id="feature-page">
      <header
        className="feature-nav"
        aria-label="Main"
      >
        <Link
          className="feature-brand"
          to="/"
        >
          <span className="brand-mark">J</span>
          <span>JEE Portal</span>
        </Link>
        <span className="exam-label">
          MAIN <i /> ADVANCED
        </span>
      </header>

      <div className="feature-main">
        <section className="feature-hero">
          <div className="feature-copy">
            <header>
              <h1>
                JEE Main &amp; Advanced
                <br />
                <em>exam practice.</em>
              </h1>
              <p className="feature-description">
                A focused space to practice for JEE Main and Advanced.
              </p>
            </header>

            <Link
              to="/registration/signup"
              className="cta-1"
              id="register-button"
            >
              <p>Start practicing</p>
              <ArrowUpRight />
            </Link>

            <div
              className="feature-points"
              aria-label="Practice features"
            >
              <div>
                <BookOpen />
                <span>Exam-style practice</span>
              </div>
              <div>
                <CheckCircle2 />
                <span>Review as you go</span>
              </div>
              <div>
                <Timer />
                <span>Find your pace</span>
              </div>
            </div>
          </div>

          <aside
            className="countdown-panel"
            aria-label="JEE Main countdown"
          >
            <div className="countdown-heading">
              <span>UNTIL EXAM DAY</span>
              <span className="countdown-year">2027</span>
            </div>
            <ExamCountdown />
            <p className="countdown-note">
              A little progress every day adds up.
            </p>
          </aside>
        </section>
      </div>

      <Footer />
    </div>
  );
}
