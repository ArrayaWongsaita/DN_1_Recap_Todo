// src/component/Header.tsx
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-blue-400 w-full flex justify-between items-center">
      <div>
        <Link to="/">Logo</Link>
      </div>
      <nav className="space-x-4">
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/register">Register</Link>
      </nav>
    </header>
  );
}
