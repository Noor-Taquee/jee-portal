import "./style.css";

export default function InstituteLogo() {
  return (
    <div className="institute-logo">
      <img
        src={`${import.meta.env.BASE_URL}images/nta_logo_light.png`}
        alt="Institute Logo"
      />
    </div>
  );
}
