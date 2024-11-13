// server/prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@123', 10)
  
  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin123@example.com' },
    update: {},
    create: {
      email: 'admin123@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Seed data created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })