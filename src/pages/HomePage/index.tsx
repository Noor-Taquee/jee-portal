import "./style.css";

import { useUser } from "../../hooks/useUser";

import NoUserContent from "./NoUserContent";
import Content from "./Content";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div
      className="app-panel"
      id="home-page"
    >
      {!user && <NoUserContent />}
      {user && <Content />}
    </div>
  );
}
