import { Link, useLoaderData, useRevalidator } from "react-router";
import FieldInput from "../components/FieldInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, type TodoSchema } from "../schemas/todo.schema";
import { useAuthStore } from "../stores/user.store";
import { axiosInstance } from "../config/axios.config";
import { toast } from "sonner";

export type Todo = { id: number } & TodoSchema;

export default function TodosPage() {
  const todos = useLoaderData<Todo[]>();
  const revalidator = useRevalidator();

  const user = useAuthStore((state) => state.user);

  // form
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      completed: false,
      taskName: "",
      userId: user?.userId,
    },
  });

  const onSubmit = async (data: TodoSchema) => {
    try {
      setValue("taskName", "");
      await axiosInstance.post("/api/V2/todos", data);
      toast.success("create todo successfully");
      revalidator.revalidate(); // reload data
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to create todo");
    }
  };

  const onDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/V2/todos/${id}`);
      revalidator.revalidate(); // reload data
      toast.success("Todo deleted");
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldInput
            label="taskName"
            {...register("taskName")}
            error={errors.taskName?.message}
          />
          <button>{isSubmitting ? "loading ..." : "Submit"}</button>
        </form>
      </div>
      {todos.map((todo) => (
        <div className="bg-gray-200 p-4 my-2 border flex justify-between">
          <h3>{todo.taskName}</h3>
          <div>
            <Link
              to={`/todos/update/${todo.id}?taskName=${todo.taskName}&completed=${todo.completed}`}
            >
              Update
            </Link>
            <button onClick={() => onDelete(todo.id)} className="text-red-500">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
