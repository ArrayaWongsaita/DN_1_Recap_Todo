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
