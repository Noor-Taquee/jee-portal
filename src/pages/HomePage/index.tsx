import "./style.css";

import { Show } from "@clerk/react";
import NoUserContent from "./NoUserContent";
import Content from "./Content";

export default function HomePage() {
  return (
    <div
      className="app-panel"
      id="home-page"
    >
      <Show
        when={"signed-in"}
        fallback={<NoUserContent />}
      >
        <Content />
      </Show>
    </div>
  );
}
