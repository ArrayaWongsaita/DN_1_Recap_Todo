// /layouts/MainLayout.tsx
import { Outlet } from "react-router";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
