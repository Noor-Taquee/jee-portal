import { Route, Routes } from "react-router-dom";
import ReviewProvider from "../../context/ReviewContext/Provider";
import ReviewPage from "./ReviewPage";

export default function Admin() {
  return (
    <Routes>
      <Route
        path="review"
        element={
          <ReviewProvider>
            <ReviewPage />
          </ReviewProvider>
        }
      />
    </Routes>
  );
}
