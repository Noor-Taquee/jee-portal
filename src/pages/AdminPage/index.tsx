import { Route, Routes } from "react-router-dom";
import Content from "./Content";
import AddQuestionPage from "./AddQuestionPage";

export default function AdminPage() {
  return (
    <Routes>
      <Route
        path=""
        element={<Content />}
      />

      <Route
        path="new/question"
        element={<AddQuestionPage />}
      />
    </Routes>
  );
}
