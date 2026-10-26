import { useUser } from "../hooks/useUser";

import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "user";
  errorView?: React.ReactNode;
}

export default function ProtectedRoute({
  requiredRole,
  errorView,
}: ProtectedRouteProps) {
  const { user } = useUser();

  if (!user) {
    return (
      errorView || (
        <Navigate
          to=""
          replace
        />
      )
    );
  }

  if (requiredRole === "admin" && user.role !== "admin") {
    return (
      errorView || (
        <Navigate
          to=""
          replace
        />
      )
    );
  }

  return <Outlet />;
}
