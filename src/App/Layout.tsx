// oxlint-disable max-lines-per-function

import { Navigate, Route, Routes } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage";
import AdminPage from "../pages/AdminPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import QuestionsPage from "../pages/QuestionsPage";
import ResultPage from "../pages/ResultPage";

/** Layout component for the main application structure */
export default function Layout() {
  return (
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
  );
}
