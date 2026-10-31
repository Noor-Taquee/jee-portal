import { useUser } from "../../../../../hooks/useUser";

export default function FullNameSection() {
  const { user } = useUser();

  return (
    <section
      aria-label="Full Name"
      className="settings-section value-based"
    >
      <div className="settings-property">
        <p>Full Name</p>
      </div>
      <div className="settings-value">
        <input
          name="full-name"
          className="settings-value-input"
          autoComplete="name"
          value={user?.name}
        />
      </div>
    </section>
  );
}
