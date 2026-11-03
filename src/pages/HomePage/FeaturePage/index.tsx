import "./style.css";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, BookOpen, CheckCircle2, Timer } from "lucide-react";
import ExamCountdown from "../../../components/ExamCountdown";
import Footer from "./Footer";

export default function FeaturePage() {
  return (
    <div id="feature-page">
      <Helmet>
        <link
          rel="canonical"
          href="https://jee-portal.pages.dev"
        />
        <meta
          name="description"
          content="Practice for JEE Main and Advanced with interactive mock exams, previous-year questions, and performance tracking on JEE Portal."
        />
        <title>JEE Portal - Interactive Exam Practice Platform</title>
        <meta
          property="og:title"
          content="JEE Portal - Interactive Exam Practice Platform"
        />
        <meta
          property="og:description"
          content="Practice for JEE Main and Advanced with interactive mock exams, previous-year questions, and performance tracking on JEE Portal."
        />
        <meta
          property="og:url"
          content="https://jee-portal.pages.dev"
        />
        <meta
          property="og:image"
          content="https://jee-portal.pages.dev/icons/icon-512.png"
        />
        <meta
          name="twitter:title"
          content="JEE Portal - Interactive Exam Practice Platform"
        />
        <meta
          name="twitter:image"
          content="https://jee-portal.pages.dev/icons/icon-512.png"
        />
        <meta
          name="twitter:description"
          content="Practice for JEE Main and Advanced with interactive mock exams, previous-year questions, and performance tracking on JEE Portal."
        />
      </Helmet>

      <header
        className="feature-nav"
        aria-label="Main"
      >
        <Link
          className="feature-brand"
          to="/"
        >
          <span
            className="app-mark brand-mark"
            aria-hidden="true"
          />
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
