// src/component/Header.tsx
import { Link } from "react-router";
import { useAuthStore } from "../stores/user.store";

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return (
    <header className="bg-blue-400 w-full flex justify-between items-center">
      <div>
        <Link to="/">Logo</Link>
      </div>
      {isAuthenticated ? (
        <button onClick={clearAuth}>Log Out</button>
      ) : (
        <nav className="space-x-4">
          <Link to="/auth/login">Login</Link>
          <Link to="/auth/register">Register</Link>
        </nav>
      )}
    </header>
  );
}
