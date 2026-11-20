import { Outlet } from "react-router-dom";
import ExamProvider from "../../context/ExamContext/ExamProvider";

export default function MockPage() {
  return (
    <ExamProvider>
      <Outlet />
    </ExamProvider>
  );
}
