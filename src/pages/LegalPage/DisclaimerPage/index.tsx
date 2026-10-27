export default function DisclaimerPage() {
  return (
    <div
      id="disclaimer-page"
      className="app-panel"
    >
      <header className="page-header">
        <h1>Educational Disclaimer &amp; Copyright Notice</h1>
        <p className="last-updated">Last modified: October 2026</p>
      </header>

      <section aria-labelledby="independent-platform-heading">
        <h3 id="independent-platform-heading">
          1. Independent Educational Platform
        </h3>
        <p>
          JEE Portal is an independent, non-governmental educational practice
          platform. JEE Portal is <strong>not</strong> affiliated with, endorsed
          by, or associated with the National Testing Agency (NTA), the Indian
          Institutes of Technology (IITs), or any governmental examination
          authority.
        </p>
      </section>

      <section aria-labelledby="pyq-ownership-heading">
        <h3 id="pyq-ownership-heading">
          2. Ownership of Previous Year Questions (PYQs)
        </h3>
        <p>
          All Previous Year Questions (PYQs), official examination trademarks,
          question sets, and logos related to JEE Main, JEE Advanced, and AIEEE
          belong to their respective copyright holders and official examination
          bodies. They are reproduced on this platform strictly for
          non-commercial, educational practice and self-evaluation purposes
          under fair use principles.
        </p>
      </section>

      <section aria-labelledby="solutions-accuracy-heading">
        <h3 id="solutions-accuracy-heading">3. Accuracy of Solutions</h3>
        <p>
          While every effort is made to ensure that answer keys, step-by-step
          solutions, and mathematical formulas are accurate and up to date, JEE
          Portal makes no warranties regarding complete accuracy or official
          answer key synchronization.
        </p>
      </section>

      <section aria-labelledby="font-license-heading">
        <h3 id="font-license-heading">4. Third-Party Fonts &amp; License</h3>
        <p>
          This platform uses the Inter typeface, which is distributed under the{" "}
          <a
            href="https://scripts.sil.org/OFL"
            target="_blank"
            rel="noreferrer"
          >
            SIL Open Font License 1.1
          </a>
          . The font is bundled locally with the application and is used in
          accordance with that license.
        </p>
      </section>
    </div>
  );
}
