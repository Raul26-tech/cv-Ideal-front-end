import { Suspense } from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Homepage from "../pages/Homepage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="login" element={<Login />} />
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
