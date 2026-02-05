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
