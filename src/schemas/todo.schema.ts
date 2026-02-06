import z from "zod";

export const todoSchema = z.object({
  taskName: z.string().min(1, "Task name is required"),
  userId: z.number().min(1, "User ID must be a positive integer"),
  completed: z.boolean().default(false),
});

export type TodoSchema = z.infer<typeof todoSchema>;
