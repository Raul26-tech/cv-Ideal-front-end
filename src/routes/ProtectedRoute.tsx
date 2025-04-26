import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

interface ProtectedRoutesProps {
  children: ReactNode;
  privilage?: "root" | "user";
}

export default function ProtectedRoute({ children }: ProtectedRoutesProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
