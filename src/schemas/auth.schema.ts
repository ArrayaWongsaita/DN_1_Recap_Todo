import z from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(3),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

// --------------- login
export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export type LoginSchema = z.infer<typeof loginSchema>;
