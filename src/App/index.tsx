import "./app.css";

import { matchPath, useLocation } from "react-router-dom";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "framer-motion";
import { useOrientation } from "../hooks/useOrientation";
import { useSettings } from "../hooks/useSettings";
import { useUser } from "../hooks/useUser";
import useNavVisibility from "../hooks/useNavVisibility";
import NavVisibilityProvider from "../context/NavVisibilityContext/Provider";

import { NavRoutes } from "../components/NavigationBar/routes";

import NavigationBar from "../components/NavigationBar/index";
import ShowNavButton from "../components/NavigationBar/ShowNavButton";
import SessionRestoreScreen from "../components/SessionRestoreScreen/index";
import Layout from "./Layout";
import ConditionalComponent from "../components/ConditionalComponent";

const loadNavigationMotionFeatures = () =>
  import("../components/NavigationBar/motionFeatures").then(
    (module) => module.default
  );

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
        <NavVisibilityProvider>
          <AppContent showNavigation={Boolean(showNavigation)} />
        </NavVisibilityProvider>
      </ConditionalComponent>
    </div>
  );
}

function AppContent({ showNavigation }: { showNavigation: boolean }) {
  const { visible } = useNavVisibility();

  return (
    <LazyMotion features={loadNavigationMotionFeatures}>
      <MotionConfig reducedMotion="user">
        <>
          <AnimatePresence initial={false}>
            {showNavigation && visible && <NavigationBar key="navigation" />}
          </AnimatePresence>
          <m.div
            id="app-main-content"
            layout
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <ShowNavButton enabled={showNavigation} />
            <Layout />
          </m.div>
        </>
      </MotionConfig>
    </LazyMotion>
  );
}
