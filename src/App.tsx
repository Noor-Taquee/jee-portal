// oxlint-disable max-lines-per-function

import "./app.css";

import { useOrientation } from "./hooks/useOrientation";
import { useSettings } from "./hooks/useSettings";
import { ClerkFailed, ClerkLoaded, ClerkLoading, useAuth } from "@clerk/react";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Activity } from "react";
import NavigationBar from "./components/NavigationBar";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import QuestionsPage from "./pages/QuestionsPage";
import ResultPage from "./pages/ResultPage";
import AdminPage from "./pages/AdminPage";
import SessionRestoreScreen from "./components/SessionRestoreScreen";

export default function App() {
  const { isSignedIn } = useAuth();
  const appSettings = useSettings();
  const orientation = useOrientation();
  const location = useLocation();

  const hideNavigation =
    [
      "/registration",
      "/exam/login",
      "/exam/questions",
      "/exam/result",
    ].includes(location.pathname) || !isSignedIn;

  return (
    <div
      id="app"
      data-theme={appSettings.theme}
      data-orientation={orientation}
      className={appSettings.simpleMode ? "original-ui" : ""}
    >
      <ClerkLoading>
        <SessionRestoreScreen />
      </ClerkLoading>

      <ClerkLoaded>
        <Activity mode={hideNavigation ? "hidden" : "visible"}>
          <NavigationBar />
        </Activity>
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
              path="/registration/*"
              element={<RegistrationPage />}
            />

            <Route
              path="/admin/*"
              element={<AdminPage />}
            />

            <Route
              path="/home/*"
              element={<HomePage />}
            />

            <Route
              path="/exam/login/*"
              element={<LoginPage />}
            />
            <Route
              path="/exam/questions/*"
              element={<QuestionsPage />}
            />
            <Route
              path="/exam/result/*"
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
      </ClerkLoaded>

      <ClerkFailed></ClerkFailed>
    </div>
  );
}
