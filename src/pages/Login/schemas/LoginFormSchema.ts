import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ message: "O e-mail do usuário é um campo obrigatório" })
    .email(),
  password: z
    .string({ message: "A senha precisa conter n mínimo 6 caracteres" })
    .min(6),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
