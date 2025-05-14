import { Suspense } from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Homepage from "../pages/Homepage";
import ProtectedRoute from "./ProtectedRoute";
import SuspensePage from "../components/SuspensePage";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <Suspense fallback={<SuspensePage />}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute redirectWhenAuthenticated>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />

        {/* Notfound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
