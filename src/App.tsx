// oxlint-disable max-lines-per-function

import "./app.css";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useOrientation } from "./hooks/useOrientation.js";
import { useSettings } from "./hooks/useSettings.js";
import { useUser } from "./hooks/useUser.js";

import NavigationBar from "./components/NavigationBar/index.js";
import RegistrationPage from "./pages/RegistrationPage/index.js";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import QuestionsPage from "./pages/QuestionsPage";
import ResultPage from "./pages/ResultPage";
import SessionRestoreScreen from "./components/SessionRestoreScreen/index.js";

export default function App() {
  const { user, loadingSession } = useUser();
  const appSettings = useSettings();
  const orientation = useOrientation();
  const location = useLocation();
  const hideNavigation =
    [
      "/registration",
      "/exam/login",
      "/exam/questions",
      "/exam/result",
    ].includes(location.pathname) || !user;

  return (
    <div
      id="app"
      data-theme={appSettings.theme}
      data-orientation={orientation}
      className={appSettings.simpleMode ? "original-ui" : ""}
    >
      {loadingSession ? <SessionRestoreScreen /> :
        <>
      {!hideNavigation && <NavigationBar />}
      <div className="panel-container">
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/home"
                replace
              />
            }
          />

          <Route
            path="/registration"
            element={<RegistrationPage />}
          />

          <Route
            path="/home"
            element={<HomePage />}
          />

          <Route
            path="/exam/login"
            element={<LoginPage />}
          />
          <Route
            path="/exam/questions"
            element={<QuestionsPage />}
          />
          <Route
            path="/exam/result"
            element={<ResultPage />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/home"
                replace
              />
            }
          />
        </Routes>
      </div>
      </>
      }
    </div>
  );
}
