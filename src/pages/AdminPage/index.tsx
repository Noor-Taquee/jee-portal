import { Route, Routes } from "react-router-dom";
import Content from "./Content";

export default function AdminPage() {
  return (
    <Routes>
      <Route
        path=""
        element={<Content />}
      />
    </Routes>
  );
}
