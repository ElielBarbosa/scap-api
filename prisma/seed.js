import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de objetos...');

  const objects = [
    {
      name: 'iPhone 13',
      description: 'Cor azul, capa transparente, encontrado na praça de alimentação',
      status: '1',
      location_found: 'Praça de Alimentação',
      object_image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
      registered_object: 2,
      removed_by: 2,
      campus_id: 1
    },
    {
      name: 'Chave de Carro',
      description: 'Chave canivete Volkswagen com chaveiro do Star Wars',
      status: '1',
      location_found: 'Estacionamento Norte',
      object_image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509',
      registered_object: 2,
      removed_by: 2,
      campus_id: 1
    },
    {
      name: 'Notebook Dell',
      description: 'Modelo Inspiron 15, preto, esquecido em cima da mesa',
      status: '1',
      location_found: 'Biblioteca - Sala 04',
      object_image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
      registered_object: 2,
      removed_by: 2,
      campus_id: 1
    },
    {
      name: 'Garrafa Térmica',
      description: 'Garrafa Stanley verde militar, com adesivos',
      status: '1',
      location_found: 'Ginásio de Esportes',
      object_image: 'https://images.unsplash.com/photo-1602143399827-bd95967c35ac',
      registered_object: 2,
      removed_by: 2, // ID de quem devolveu
      campus_id: 1
    },
    {
      name: 'Carteira de Couro',
      description: 'Carteira marrom contendo documentos de "João Silva"',
      status: '1',
      location_found: 'Corredor Bloco C',
      object_image: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
      registered_object: 2,
      removed_by: 2,
      campus_id: 1
    }
  ];

  // Usando um loop para inserir cada objeto
  for (const obj of objects) {
    await prisma.$queryRaw`
      INSERT INTO tb_object (
        name_objetct, 
        description,
        status,
        location_found,
        object_image,       
        registered_object,  
        removed_by,         
        campus_id           
      ) VALUES (
        ${obj.name},
        ${obj.description},
        ${obj.status},
        ${obj.location_found},
        ${obj.object_image},
        ${obj.registered_object},
        ${obj.removed_by},
        ${obj.campus_id}
      );
    `;
  }

  console.log(`✅ Seed finalizado! ${objects.length} objetos inseridos.`);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });