import "./app.css";

import { matchPath, useLocation } from "react-router-dom";
import { useOrientation } from "../hooks/useOrientation";
import { useSettings } from "../hooks/useSettings";
import { useUser } from "../hooks/useUser";

import { NavRoutes } from "../components/NavigationBar/routes";

import { Activity } from "react";
import NavigationBar from "../components/NavigationBar/index";
import SessionRestoreScreen from "../components/SessionRestoreScreen/index";
import Layout from "./Layout";
import ConditionalComponent from "../components/ConditionalComponent";

export default function App() {
  const { user, loadingSession } = useUser();
  const appSettings = useSettings();
  const orientation = useOrientation();
  const location = useLocation();

  const showNavigation =
    user &&
    NavRoutes.some((pattern) => {
      return matchPath({ path: pattern, end: true }, location.pathname);
    });

  return (
    <div
      id="app"
      data-theme={appSettings.theme}
      data-orientation={orientation}
      className={appSettings.simpleMode ? "original-ui" : ""}
    >
      <ConditionalComponent
        show={!loadingSession}
        fallback={<SessionRestoreScreen />}
      >
        <Activity mode={showNavigation ? "visible" : "hidden"}>
          <NavigationBar />
        </Activity>
        <Layout />
      </ConditionalComponent>
    </div>
  );
}
