# DN_1_Recap_Todo

## Init React Project

- pnpm create vite@latest .

## Init Tailwind

```cmd
 pnpm install tailwindcss @tailwindcss/vite
```

```typescript
// vite config
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

```css
/* index.css */
@import "tailwindcss";
```

## setup

rm : App.css

## setup react - router

- install: react-router

```cmd
pnpm i react-router
```

- create file: src/routes/index.tsx

```tsx
pnpm i react-router
```

- create file: src/pages/HomePage.tsx
- create file: src/pages/LoginPage.tsx
- create file: src/pages/RegisterPage.tsx
- create file: src/pages/TodosPage.tsx
- create file: src/pages/UpdateTodoPage.tsx
- create file: src/layouts/MainLayout.tsx
- create file: src/components/Header.tsx

```tsx
// src/route/index.ts
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TodosPage from "../pages/TodosPage";
import UpdateTodoPage from "../pages/UpdateTodoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
      {
        path: "todos",
        children: [
          { path: ":page", element: <TodosPage /> },
          { path: "update/:id", element: <UpdateTodoPage /> },
        ],
      },
    ],
  },
]);
```

```tsx
// app.tsx
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}
```

```tsx
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
```

```tsx
// src/component/Header.tsx
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-blue-400 w-full flex justify-between items-center">
      <div>Logo</div>
      <nav className="space-x-4">
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/register">Register</Link>
      </nav>
    </header>
  );
}
```

## Register
