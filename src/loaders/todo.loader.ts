import type { LoaderFunction } from "react-router";
import { axiosInstance } from "../config/axios.config";

export const loadTodos: LoaderFunction = async () => {
  const res = await axiosInstance.get("/api/V2/todos");
  return res.data.todos;
};

export const loadTodoById: LoaderFunction = async ({ params }) => {
  const res = await axiosInstance.get(`/api/V2/todos/${params.todoId}`);
  return res.data;
};
