// src/route/index.ts
import { createBrowserRouter, Outlet } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TodosPage from "../pages/TodosPage";
import UpdateTodoPage from "../pages/UpdateTodoPage";
import PrivateRoute from "../components/PrivateRoute";
import { loadTodos } from "../loaders/todo.loader";

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
        element: (
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            path: ":page",
            loader: loadTodos,
            element: <TodosPage />,
          },
          { path: "update/:id", element: <UpdateTodoPage /> },
        ],
      },
    ],
  },
]);
