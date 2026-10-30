import { lazy, Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import PageLoader from "../components/PageLoader";
import PageNotFound404 from "../pages/404";

const HomePage = lazy(() => import("../pages/HomePage"));

const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));

const ExamPage = lazy(() => import("../pages/ExamPage"));
const LoginPage = lazy(() => import("../pages/ExamPage/LoginPage"));
const QuestionsPage = lazy(() => import("../pages/ExamPage/QuestionsPage"));
const ResultPage = lazy(() => import("../pages/ExamPage/ResultPage"));

const AdminPage = lazy(() => import("../pages/AdminPage"));
const AdminContent = lazy(() => import("../pages/AdminPage/AdminContent"));
const AddQuestionPage = lazy(
  () => import("../pages/AdminPage/AddQuestionPage")
);

const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const AccountSettings = lazy(
  () => import("../pages/SettingsPage/AccountSettings")
);
const GeneralSettings = lazy(
  () => import("../pages/SettingsPage/GeneralSettings")
);

const LegalPage = lazy(() => import("../pages/LegalPage"));
const DisclaimerPage = lazy(() => import("../pages/LegalPage/DisclaimerPage"));
const TermsOfServicePage = lazy(
  () => import("../pages/LegalPage/TermsOfServicePage")
);
const PrivacyPolicyPage = lazy(
  () => import("../pages/LegalPage/PrivacyPolicyPage")
);

/** Layout component for the main application structure */
export default function Layout() {
  return (
    <main id="panel-container">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="/registration/*"
            element={<RegistrationPage />}
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/exam"
              element={<ExamPage />}
            >
              <Route
                path="login"
                element={<LoginPage />}
              />
              <Route
                path="questions"
                element={<QuestionsPage />}
              />
              <Route
                path="result"
                element={<ResultPage />}
              />
            </Route>
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

          <Route element={<ProtectedRoute />}>
            <Route
              path="/settings"
              element={<SettingsPage />}
            >
              <Route
                index
                element={
                  <Navigate
                    to={"general"}
                    replace
                  />
                }
              />
              <Route
                path="general"
                element={<GeneralSettings />}
              />
              <Route
                path="account"
                element={<AccountSettings />}
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
