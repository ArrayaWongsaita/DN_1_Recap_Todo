import { useForm } from "react-hook-form";
import FieldInput from "../components/FieldInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../schemas/auth.schema";
import { axiosInstance } from "../config/axios.config";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/user.store";

export default function LoginPage() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await axiosInstance.post("/api/V1/auth/login", data);
      // set data
      const user = { userId: res.data.userId };
      const accessToken = res.data.accessToken;
      setAuth(user, accessToken);

      toast.success("login success");
      navigate("/todos/1");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
        setError("username", { message });
        return;
      }
      toast.error("login error");
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

          <button>{isSubmitting ? "loading ... " : "Submit"}</button>
        </form>
      </div>
    </div>
  );
}
