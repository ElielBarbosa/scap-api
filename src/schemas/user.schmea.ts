import { z } from "zod";

export const userRegisterSchema = z.object({
  username: z
    .string("Nome de usuario inválido")
    .min(3, "Nome de usuario deve conter no mínimo 3 caracteres")
    .max(255, "Nome de usuario deve conter no máximo 3 caracteres"),
  email: z.string("E-mail deve ser do tipo string"),
  passwordHash: z.string().min(6).max(255),
  campusId: z.number("").int("O id de do campus deve ser um número inteiro"),
  registration: z.string("").min(8).max(50),
});

export const userId = z.object({
  id: z.number().int(),
});
