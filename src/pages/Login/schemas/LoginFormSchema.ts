import { z } from "zod";

export const loginFormSchema = z.object({
  name: z.string({ message: "Nome do usuário é um campo obrigatório" }),
  password: z
    .string({ message: "A senha precisa conter n mínimo 6 caracteres" })
    .min(6),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
