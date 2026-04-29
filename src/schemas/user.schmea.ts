import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const userRegisterSchema = z.object({
  username: z
    .string("Nome de usuario inválido")
    .min(3, "Nome de usuario deve conter no mínimo 3 caracteres")
    .max(255, "Nome de usuario deve conter no máximo 3 caracteres"),
  email: z
    .string()
    .min(5, "E-mail deve ter no mínimo 5 caracteres")
    .max(100, "E-mail deve ter no máximo 100 caracteres")
    .regex(emailRegex, "Email inválido"),
  password: z
    .string()
    .min(6, "Senha deve ter no minimo 6 caracteres")
    .max(255, "Senha deve ter no máximo 255 caracteres"),
  campusId: z
    .number("Id do campus deve ser um número")
    .int("O id de do campus deve ser um número inteiro"),
  registration: z
    .string()
    .min(8, "Maricula deveconter no mínimo 8 caracteres")
    .max(50, "Matricula deve conter no máximo 50 caracteres"),
});

export const userIdSchema = z.object({
  id: z.number("Id de usuário deve ser um número inteiro").int(),
});
