import { JSX } from "react";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
  children: JSX.Element;
  redirectWhenAuthenticated?: boolean;
}

export default function PublicRoute({
  children,
  redirectWhenAuthenticated = false,
}: PublicRouteProps) {
  const { user, loading, navigateToHomePage } = useAuth();

  if (loading) {
    return <div />;
  }

  if (user && redirectWhenAuthenticated) {
    navigateToHomePage(user);

    return null;
  }

  return children;
}
