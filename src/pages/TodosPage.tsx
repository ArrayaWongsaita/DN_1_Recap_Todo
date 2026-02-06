import { useForm } from "react-hook-form";
import { Link, useLoaderData, useRevalidator } from "react-router";
import { todoSchema, type TodoSchema } from "../schemas/todo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../stores/user.store";
import FieldInput from "../components/FieldInput";
import { toast } from "sonner";
import { axiosInstance } from "../config/axios.config";

export type Todo = {
  id: number;
  taskName: string;
  isCompleted: boolean;
  userId: number;
};

export default function TodosPage() {
  const todos = useLoaderData<Todo[]>();
  const user = useAuthStore((state) => state.user);
  const revalidator = useRevalidator();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      taskName: "",
      userId: user?.userId || 0,
    },
  });

  const onSubmit = async (data: TodoSchema) => {
    try {
      await axiosInstance.post("/api/V2/todos", data);
      revalidator.revalidate();
      toast.success("Todo added successfully");
      setValue("taskName", "");
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to add todo");
    }
  };
  const onDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/V2/todos/${id}`);
      revalidator.revalidate();
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to delete todo");
    }
  };
  return (
    <div className="mx-8">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldInput
            label="Task Name"
            error={errors.taskName?.message}
            {...register("taskName")}
          />
          <button>{isSubmitting ? "loading ... " : "Submit"}</button>
        </form>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className="border p-4 my-2">
          <h3 className="font-bold">{todo.taskName}</h3>
          <p>Status: {todo.isCompleted ? "Completed" : "Pending"}</p>
          <Link
            to={`/todos/update/${todo.id}?isCompleted=${todo.isCompleted}&taskName=${todo.taskName}`}
            className="text-blue-600"
          >
            Update
          </Link>
          <button
            className="mt-2 text-red-600"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
