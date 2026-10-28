import { lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";

const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const QuestionsPage = lazy(() => import("../pages/QuestionsPage"));
const ResultPage = lazy(() => import("../pages/ResultPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const LegalPage = lazy(() => import("../pages/LegalPage"));
const DisclaimerPage = lazy(() => import("../pages/LegalPage/DisclaimerPage"));
const TermsOfServicePage = lazy(
  () => import("../pages/LegalPage/TermsOfServicePage")
);
const PrivacyPolicyPage = lazy(
  () => import("../pages/LegalPage/PrivacyPolicyPage")
);
const PageNotFound404 = lazy(() => import("../pages/404"));

/** Layout component for the main application structure */
export default function Layout() {
  return (
    <main id="panel-container">
      <Suspense>
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
              path="/admin"
              element={<AdminPage />}
            >
              <Route
                index
                element={<AdminContent />}
              />
              <Route
                path="new/question"
                element={<AddQuestionPage />}
              />
            </Route>
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
      </Suspense>
    </main>
  );
}
