import prisma from '../src/configs/prisma-client.config';

async function main() {
  const categories = [
    { name: 'Food' },
    { name: 'Snack' },
    { name: 'Beverage' },
  ];

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log('✅ Category seeding completed');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
