export default function TermsOfServicePage() {
  return (
    <div
      id="terms-of-service-page"
      className="app-panel"
    >
      <header className="page-header">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last modified: October 2026</p>
      </header>

      <section aria-labelledby="welcome-heading">
        <h4 id="welcome-heading">
          Welcome to JEE Portal! Before you access our services, please read
          these Terms of Service.
        </h4>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of the JEE
          Portal examination practice platform, question banks, mock test
          suites. These Terms represent a legal agreement between you and JEE
          Portal. By accessing or using our Services, you agree to be bound by
          these Terms.
        </p>
        <p>
          Please review our{" "}
          <a
            href="/legal/privacy-policy"
            target="_blank"
          >
            Privacy Policy
          </a>
          , which describes how we collect, handle, and protect your personal
          information and practice metrics.
        </p>
      </section>

      <section aria-labelledby="acceptable-use-heading">
        <h3 id="acceptable-use-heading">1. Acceptable Use</h3>
        <p>
          JEE Portal is provided strictly for personal, non-commercial exam
          preparation. You agree <strong>not</strong> to:
        </p>
        <ul>
          <li>
            Except when you are accessing our Services via an authorized API Key
            or where we otherwise explicitly permit it, access the Services
            through automated or non-human means, whether through a bot, script,
            or otherwise to scrape, extract, or bulk-download question datasets
            or platform assets.
          </li>
          <li>
            Attempt to bypass authentication mechanisms or access unauthorized
            administrative endpoints.
          </li>
          <li>
            Interfere with or disrupt system infrastructure and network
            stability.
          </li>
          <li>
            Engage in any other conduct that restricts or inhibits any person
            from using or enjoying our Services, or that we reasonably believe
            exposes us—or any of our users, affiliates, or any third party—to
            any liability, damages, or detriment of any type, including
            reputational harms.
          </li>
        </ul>
      </section>

      <section aria-labelledby="accounts-heading">
        <h3 id="accounts-heading">2. User Accounts</h3>
        <p>
          To access our practice tests and personalized performance insights,
          you may be required to create an account. You agree to provide
          accurate and complete account information.
        </p>
        <p>
          You may not share your account login credentials or API keys with
          anyone else, nor make your account available to third parties. You are
          solely responsible for all activity occurring under your account.
          Please notify us immediately if you suspect any unauthorized access.
        </p>
      </section>

      <section aria-labelledby="limitation-heading">
        <h3 id="limitation-heading">3. Limitation of Liability</h3>
        <p>
          JEE Portal is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis without warranties of any kind. We do not
          guarantee uninterrupted uptime during peak exam periods and are not
          liable for any exam results or data loss.
        </p>
        <p>
          Under no circumstances will JEE Portal be liable for any expense, loss
          or damage including, without limitation, indirect or consequential
          loss or damage, or any expense, loss or damage whatsoever arising from
          use, or loss of use, of data, arising out of or in connection with the
          use of this website.
        </p>
      </section>

      <section aria-labelledby="governing-law-heading">
        <h3 id="governing-law-heading">4. Governing Law &amp; Jurisdiction</h3>
        <p>
          These terms and conditions shall be governed by and construed in
          accordance with the Indian Laws. Any dispute arising under these terms
          and conditions shall be subject to the jurisdiction of the courts of
          India.
        </p>
      </section>
    </div>
  );
}
