import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('✨ Iniciando limpeza do banco...');
  // Limpa as tabelas na ordem correta para não quebrar as constraints
  await prisma.$executeRaw`TRUNCATE TABLE "tb_notification", "tb_category_objeto", "tb_object", "tb_user", "tb_category", "tb_campus" RESTART IDENTITY CASCADE;`;

  console.log('🌱 Semeando Campus...');
  const campusData = [
    { city: 'Aracaju', address: 'Av. Marechal Rondon, s/n' },
    { city: 'Itabaiana', address: 'Av. Vereador Olímpio Grande' },
    { city: 'Lagarto', address: 'Av. Governador Marcelo Déda' },
    { city: 'São Cristóvão', address: 'Rua de Aracaju, s/n' },
    { city: 'Estância', address: 'Rua General Calazans' },
  ];

  const createdCampuses = [];
  for (const c of campusData) {
    const saved = await prisma.tb_campus.create({ data: c });
    createdCampuses.push(saved);
  }

  console.log('🌱 Semeando Usuários...');
  const createdUsers = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.tb_user.create({
      data: {
        user_name: `Usuário ${i + 1}`,
        email: `usuario${i + 1}@email.com`,
        registration: `REGISTRATION-${100 + i}`,
        password_hash: 'hash_padrao_123',
        user_type: 2, // Mantido como String. Se seu banco pedir Int, mude para: 1
        campus_id: createdCampuses[i].id,
      },
    });
    createdUsers.push(user);
  }

  console.log('🌱 Semeando Categorias...');
  const categoryNames = ['Eletrônicos', 'Documentos', 'Vestuário', 'Chaves', 'Outros'];
  const createdCategories = [];
  for (const name of categoryNames) {
    const cat = await prisma.tb_category.create({ data: { name_category: name } });
    createdCategories.push(cat);
  }

  console.log('🌱 Semeando Objetos...');
  const createdObjects = [];
  const objectNames = ['iPhone 13', 'Carteira de Couro', 'Chave de Carro', 'Casaco Moletom', 'Mochila'];

  for (let i = 0; i < 5; i++) {
    const obj = await prisma.tb_object.create({
      data: {
        name_objetct: objectNames[i],
        description: `Descrição do item ${objectNames[i]}`,
        status: 'A', // 'A' para Achado
        location_found: 'Setor de Vivência',
        object_image: 'https://placehold.co/400',
        registered_object: createdUsers[i].id,
        campus_id: createdCampuses[i].id,
      },
    });
    createdObjects.push(obj);
  }

  console.log('🌱 Relacionando Objetos e Categorias...');
  // Usando SQL puro porque a tabela tb_category_objeto não tem ID próprio
  for (let i = 0; i < 5; i++) {
    await prisma.$executeRaw`
      INSERT INTO "tb_category_objeto" (tb_category_id, tb_objeto_id) 
      VALUES (${createdCategories[i].id}, ${createdObjects[i].id});
    `;
  }

  console.log('🌱 Semeando Notificações...');
  for (let i = 0; i < 5; i++) {
    await prisma.tb_notification.create({
      data: {
        user_id: createdUsers[i].id,
        messager: `Olá, um novo objeto (${objectNames[i]}) foi cadastrado no seu campus!`,
      },
    });
  }

  console.log('✅ Seed finalizado com sucesso (5 registros por tabela)!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });