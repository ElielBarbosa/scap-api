import { z } from "zod";

export const dataCampus = z.object({
  address: z
    .string()
    .min(3, "O nome da cidade deve conter no mínimo 3 caracteres")
    .max(255, "O nome da cidade deve conter no máximo 255 caracteres"),
  city: z
    .string()
    .min(3, "O nome da cidade deve conter no mínimo 3 caracteres")
    .max(255, "O nome da cidade deve conter no máximo 255 caracteres"),
});
