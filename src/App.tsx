// oxlint-disable max-lines-per-function
import { useEffect, useState } from "react";

import { changeHash, normalize } from "./utils/hash-handler.js";

import "./app.css";

import { getQuestions, type QuestionData } from "./core/data";

import LoginPage from "./pages/LoginPage";
import QuestionsPage from "./pages/QuestionsPage";
import { useOrientation } from "./hooks/useOrientation.js";

const routes = ["login", "question"];
const defaultRoute = "question";

type Orientation = "portrait" | "landscape";

export default function App() {
  const [questionData, setQuestionData] = useState<QuestionData[] | null>(null);
  useEffect(() => {
    getQuestions().then((data) => setQuestionData(data));
  }, []);

  const [panel, setPanel] = useState<string>("home");

  const [innerRoute, setInnerRoute] = useState<[string[], string[]]>([[], []]);
  // MARK: Hash
  useEffect(() => {
    function handleHashChange() {
      const rawHash = window.location.hash;
      const [location, attributes] = normalize(rawHash);

      const currentLocation = location[0];

      if (currentLocation && routes.includes(currentLocation)) {
        setPanel(currentLocation);
        setInnerRoute([location.slice(1), attributes]);
        return;
      }

      changeHash(defaultRoute);
      setPanel(defaultRoute);
    }

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("load", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("load", handleHashChange);
    };
  }, []);

  const orientation = useOrientation();

  return (
    <div
      id="app"
      data-theme="light"
      data-orientation={orientation}
    >
      <div className="panel-container">
        {panel === "login" && <LoginPage />}
        {panel === "question" && (
          <QuestionsPage
            questionData={questionData}
            route={innerRoute}
          />
        )}
      </div>
    </div>
  );
}
