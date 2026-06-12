import { PrismaClient } from "../generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as dotenv from "dotenv"

dotenv.config()

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.task.createMany({
    data: [
      {
        title: "Set up project repository",
        description: "Initialise the GitHub repo with frontend and backend folders",
        status: "TODO",
        priority: "HIGH",
        dueDate: new Date("2026-06-15"),
      },
      {
        title: "Design Prisma schema",
        description: "Create Task model and enums",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: new Date("2026-06-16"),
      },
      {
        title: "Create database migration",
        description: "Generate initial migration using Prisma",
        status: "DONE",
        priority: "MEDIUM",
      },
      {
        title: "Implement task API",
        description: "Create CRUD endpoints using Express and Prisma",
        status: "TODO",
        priority: "HIGH",
        dueDate: new Date("2026-06-18"),
      },
      {
        title: "Write project README",
        description: "Document setup and usage instructions",
        status: "TODO",
        priority: "LOW",
        dueDate: new Date("2026-06-20"),
      },
    ],
  })

  console.log("Seed data inserted successfully")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })