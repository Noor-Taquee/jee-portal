import { Helmet } from "react-helmet-async";

export default function AccountSettings() {
  return (
    <div
      id="account-settings"
      className="settings-panel"
    >
      <Helmet>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
        <title>Account settings</title>
      </Helmet>

      <h1>Account</h1>
    </div>
  );
}
