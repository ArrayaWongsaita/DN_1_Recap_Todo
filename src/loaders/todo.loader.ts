import type { LoaderFunction } from "react-router";
import { axiosInstance } from "../config/axios.config";

export const loadTodos: LoaderFunction = async (agrs) => {
  //  const param = agrs.params
  const res = await axiosInstance.get("/api/V2/todos");
  return res.data.todos;
};
