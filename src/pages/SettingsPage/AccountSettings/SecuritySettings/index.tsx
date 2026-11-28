import DeletionSection from "./DeletionSection";
import SessionSection from "./SessionSection";

export default function SecuritySettings() {
  return (
    <div className="settings-category">
      <h2>Security</h2>

      <DeletionSection />

      <SessionSection />
    </div>
  );
}
