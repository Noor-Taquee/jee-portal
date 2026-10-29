import DocsSidebar from "../../../components/DocsSidebar";

export default function PrivacyPolicyPage() {
  return (
    <div
      id="privacy-policy-page"
      className="app-panel"
    >
      <header className="page-header">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last modified: October 2026</p>
      </header>

      <div className="docs-layout">
        <article
          aria-label="Privacy Policy"
          id="privacy-policy-docs"
          className="legal-article"
        >
          <section aria-labelledby="info-collected-heading">
            <h3 id="info-collected-heading">1. Information We Collect</h3>
            <p>
              We collect minimal data required to provide a functional and
              personalized exam practice experience:
            </p>
            <ul>
              <li>
                <strong>Account Data:</strong> When you register or sign in, we
                collect basic account identifiers such as your name, email
                address, and authentication tokens.
              </li>
              <li>
                <strong>Usage &amp; Analytics Data:</strong> We store test
                attempt histories, time spent per question, question bookmarks,
                flagged problems, and accuracy statistics to deliver
                personalized performance insights.
              </li>
            </ul>
          </section>

          <section aria-labelledby="local-storage-heading">
            <h3 id="local-storage-heading">2. Local Storage &amp; Cookies</h3>
            <p>
              JEE Portal utilizes browser <code>localStorage</code> and session
              storage strictly to maintain authenticated user sessions, store
              active UI theme preferences, and enable instant app restoration.
              We do not track your activity across third-party websites or sell
              user data.
            </p>
          </section>

          <section aria-labelledby="data-security-heading">
            <h3 id="data-security-heading">3. Data Storage &amp; Security</h3>
            <p>
              Your performance records and session details are stored securely
              using cloud database infrastructure (Cloudflare D1 / Turso) with
              standard security practices to prevent unauthorized access.
            </p>
          </section>

          <section aria-labelledby="third-party-heading">
            <h3 id="third-party-heading">4. Third-Party Infrastructure</h3>
            <p>
              We rely on modern cloud providers (such as Cloudflare) to serve
              this web application efficiently. These infrastructure services
              handle request traffic in compliance with global data protection
              standards.
            </p>
          </section>
        </article>

        <DocsSidebar />
      </div>
    </div>
  );
}
