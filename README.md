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

```tsx
// FieldInput
import { type InputHTMLAttributes } from "react";

type FieldInputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FieldInput({
  label,
  error,
  ...inputProps
}: FieldInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputProps.name}>{label}</label>
      <input
        id={inputProps.name}
        type="text"
        className="border"
        {...inputProps}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
```

## Register

```cmd
 pnpm i react-hook-form zod @hookform/resolvers
```

```ts
import z from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(3),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
```

```cmd
pnpm i axios sonner
```

```tsx
// app.tsx
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster richColors />
      <RouterProvider router={router} />
    </>
  );
}
```

```tsx
import { useForm } from "react-hook-form";
import FieldInput from "../components/FieldInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "../schemas/auth.schema";
import { axiosInstance } from "../config/axios.config";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await axiosInstance.post("/api/V1/auth/register", data);
      toast.success("register success");
      navigate("/auth/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        // error.response?.status === 409
        const message = error.response?.data?.message;
        toast.error(message);
        setError("username", { message });
        return;
      }
      toast.error("register error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldInput
            label="Username"
            error={errors.username?.message}
            {...register("username")}
          />
          <FieldInput
            label="Password"
            error={errors.password?.message}
            {...register("password")}
          />
          <FieldInput
            label="ConfirmPassword"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <button>{isSubmitting ? "loading ... " : "Submit"}</button>
        </form>
      </div>
    </div>
  );
}
```

```cmd
pnpm i zustand
```
