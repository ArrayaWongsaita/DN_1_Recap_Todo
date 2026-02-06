import z from "zod";

export const todoSchema = z.object({
  taskName: z.string().min(3),
  userId: z.number(),
  completed: z.boolean().default(false),
});

export type TodoSchema = z.infer<typeof todoSchema>;
