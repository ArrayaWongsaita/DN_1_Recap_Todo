import { useForm } from "react-hook-form";
import FieldInput from "../components/FieldInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, type TodoSchema } from "../schemas/todo.schema";
import { useAuthStore } from "../stores/user.store";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { axiosInstance } from "../config/axios.config";
import { toast } from "sonner";

export default function UpdateTodoPage() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const completed = searchParams.get("completed");
  const taskName = searchParams.get("taskName");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      taskName: taskName || "",
      userId: user?.userId || 0,
      completed: completed === "true" ? true : false,
    },
  });

  const onSubmit = async (data: TodoSchema) => {
    try {
      await axiosInstance.patch(`/api/V2/todos/${params.id}`, data);

      navigate("/todos/1");
      setValue("taskName", "");
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to update todo");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FieldInput
          label="Task Name"
          error={errors.taskName?.message}
          {...register("taskName")}
        />
        <select {...register("completed")}>
          <option value="false">Incomplete</option>
          <option value="true">Completed</option>
        </select>
        <Link to="/todos/1" className="mr-4 text-blue-600">
          Back to Todos
        </Link>
        <button>{isSubmitting ? "loading ... " : "Submit"}</button>
      </form>
    </div>
  );
}
