import { Helmet } from "react-helmet-async";
import AppearanceSettings from "./AppearanceSettings";

export default function GeneralSettings() {
  return (
    <div
      id="general-settings"
      className="settings-panel"
    >
      <Helmet>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
        <title>General settings</title>
      </Helmet>

      <h1>General</h1>

      <AppearanceSettings />
    </div>
  );
}
