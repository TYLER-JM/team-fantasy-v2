import { PrismaClient } from "@prisma/client"
/**
 * FOR AVOIDING MULTIPLE CLIENTS when using NextJS
 * OPTIONS:
 * pass as the argument to new PrismaClient: { log: ['query'] }
 */
let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

// Useful output during development

// prisma.$use(async (params, next) => {
//   const before = Date.now()
//   const result = await next(params)
//   const after = Date.now()
//   console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
//   return result
// })

export default prisma