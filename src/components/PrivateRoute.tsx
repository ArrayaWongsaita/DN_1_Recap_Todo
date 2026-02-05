import { Navigate } from "react-router";
import { useAuthStore } from "../stores/user.store";
import type { ReactNode } from "react";

type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/" />;
  return <div>{children}</div>;
}
