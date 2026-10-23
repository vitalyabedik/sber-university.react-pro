import { z } from "zod";

const linkSchema = z.object({
  url: z.string().url("Некорректный URL").optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Имя обязательно"),
    email: z.string().email("Некорректный email"),
    password: z.string().min(6, "Пароль — минимум 6 символов"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
    socialLinks: z.array(linkSchema),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
