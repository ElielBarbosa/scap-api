import { z } from "zod";

/*
Preciso adequar os inputs e as valildaçoes ao formulário de registro de objetos,
por enquanto está apenas name, category e description(preciso enviar do id do admin que 
registro e o id do campus onde ele percente, só será possível com a autorização funcionando).
Eu retirei a middleware de validação da rotade registro de objetos para evitar erro de validação no frontend
*/

export const dataObjectRegister = z.object({
  name: z
    .string()
    .min(3, "O nome do objeto deve conter no mínimo 3 caracteres")
    .max(255, "O nome do objeto deve conter no máximo 255 caracteres"),
  description: z
    .string()
    .min(10, "A descrição do objeto deve conter no mínimo 10 caracteres")
    .max(255, "A descrição do objeto deve conter no máximo 255 caracteres"),
  // locationFound: z
  //   .string()
  //   .min(3, "O local onde o objeto foi encontrado deve conter no mínimo 3 caracteres")
  //   .max(255, "O local onde o objeto foi encontrado deve conter no máximo 255 caracteres"),
  // registeredObject: z
  //   .number()
  //   .int("O ID do usuário que registrou o objeto deve ser um número inteiro")
  //   .positive("O ID do usuário que registrou o objeto deve ser um número positivo"),
  campusId: z
    .number()
    .int("O ID do campus deve ser um número inteiro")
    .positive("O ID do campus deve ser um número positivo"),
});