import { Route, Routes } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage";
import AdminPage from "../pages/AdminPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import QuestionsPage from "../pages/QuestionsPage";
import ResultPage from "../pages/ResultPage";
import LegalPage from "../pages/LegalPage";
import PageNotFound404 from "../pages/404";
import DisclaimerPage from "../pages/LegalPage/DisclaimerPage";
import TermsOfServicePage from "../pages/LegalPage/TermsOfServicePage";
import PrivacyPolicyPage from "../pages/LegalPage/PrivacyPolicyPage";
import ProtectedRoute from "./ProtectedRoute";

/** Layout component for the main application structure */
export default function Layout() {
  return (
    <main id="panel-container">
      <Routes>
        <Route
          index
          element={<HomePage />}
        />

        <Route
          path="/home/*"
          element={<HomePage />}
        />

        <Route
          path="/registration/*"
          element={<RegistrationPage />}
        />

        <Route element={<ProtectedRoute />}>
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
        </Route>

        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route
            path="/admin/*"
            element={<AdminPage />}
          />
        </Route>

        <Route
          path="/legal"
          element={<LegalPage />}
        >
          <Route
            path="disclaimer"
            element={<DisclaimerPage />}
          />
          <Route
            path="terms-of-service"
            element={<TermsOfServicePage />}
          />
          <Route
            path="privacy-policy"
            element={<PrivacyPolicyPage />}
          />
        </Route>

        <Route
          path="*"
          element={<PageNotFound404 />}
        />
      </Routes>
    </main>
  );
}
