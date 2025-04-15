import { Suspense } from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Homepage from "../pages/Homepage";

export default function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        {/* Notfound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
