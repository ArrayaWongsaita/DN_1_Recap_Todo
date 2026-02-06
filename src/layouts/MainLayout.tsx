// /layouts/MainLayout.tsx
import { Outlet, useNavigation } from "react-router";
import Header from "../components/Header";

export default function MainLayout() {
  const { state } = useNavigation();

  return (
    <div>
      <Header />
      {state === "loading" ? <p>loading</p> : <Outlet />}
    </div>
  );
}
