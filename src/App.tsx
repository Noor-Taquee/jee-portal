// oxlint-disable max-lines-per-function

import "./app.css";

import { useOrientation } from "./hooks/useOrientation.js";
import { useHash } from "./hooks/useHash.js";
import { useSettings } from "./hooks/useSettings.js";
import { useUser } from "./hooks/useUser.js";

import NavigationBar from "./components/NavigationBar/index.js";
import RegistrationPage from "./pages/RegistrationPage/index.js";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import QuestionsPage from "./pages/QuestionsPage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  const { user } = useUser();
  const appSettings = useSettings();
  let panel = useHash();
  const orientation = useOrientation();

  return (
    <div
      id="app"
      data-theme={appSettings.theme}
      data-orientation={orientation}
      className={appSettings.simpleMode ? "original-ui" : ""}
    >
      {user &&
        !["registration", "login", "question", "result"].includes(panel) && (
          <NavigationBar panel={panel} />
        )}
      <div className="panel-container">
        {panel === "registration" && <RegistrationPage />}
        {panel === "home" && <HomePage />}
        {panel === "login" && <LoginPage />}
        {panel === "question" && <QuestionsPage />}
        {panel === "result" && <ResultPage />}
      </div>
    </div>
  );
}
