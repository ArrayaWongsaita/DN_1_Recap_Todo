import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { todoSchema, type TodoSchema } from "../schemas/todo.schema";
import { useAuthStore } from "../stores/user.store";
import FieldInput from "../components/FieldInput";
import { toast } from "sonner";
import { axiosInstance } from "../config/axios.config";

export default function UpdateTodoPage() {
  const [searchParams] = useSearchParams();
  const completed = searchParams.get("completed");
  const taskName = searchParams.get("taskName");
  const user = useAuthStore((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      completed: completed === "true",
      taskName: taskName || "",
      userId: user?.userId || 0,
    },
  });

  const onSubmit = async (data: TodoSchema) => {
    try {
      await axiosInstance.patch(`/api/V2/todos/${params.id}`, data);
      toast.success("updated");
      navigate("/todos/1");
    } catch (error) {
      console.log("error", error);
      toast.error("update error");
    }
  };

  console.log("completed", completed);
  console.log("taskName", taskName);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldInput
          label="Task Name"
          {...register("taskName")}
          error={errors.taskName?.message}
        />
        <Link to="/todos/1">Back To todo</Link>
        <button>{isSubmitting ? "loading" : "Submit"}</button>
      </form>
    </div>
  );
}
