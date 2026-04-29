import { z } from "zod";

export const dataObjectRegister = z.object({
  name: z
    .string()
    .min(3, "O nome do objeto deve conter no mínimo 3 caracteres")
    .max(255, "O nome do objeto deve conter no máximo 255 caracteres"),
  description: z
    .string()
    .min(10, "A descrição do objeto deve conter no mínimo 10 caracteres")
    .max(255, "A descrição do objeto deve conter no máximo 255 caracteres"),
  locationFound: z
    .string()
    .min(3, "O local onde o objeto foi encontrado deve conter no mínimo 3 caracteres")
    .max(255, "O local onde o objeto foi encontrado deve conter no máximo 255 caracteres"),
  objectImage: z
    .string()
    .min(3, "A URL da imagem do objeto deve conter no mínimo 3 caracteres")
    .max(255, "A URL da imagem do objeto deve conter no máximo 255 caracteres"),
  registered_object: z
    .number()
    .int("O ID do usuário que registrou o objeto deve ser um número inteiro")
    .positive("O ID do usuário que registrou o objeto deve ser um número positivo"),
  removed_by: z
    .number()
    .int("O ID do usuário que removeu o objeto deve ser um número inteiro")
    .positive("O ID do usuário que removeu o objeto deve ser um número positivo"),
  campus_id: z
    .number()
    .int("O ID do campus deve ser um número inteiro")
    .positive("O ID do campus deve ser um número positivo"),
});