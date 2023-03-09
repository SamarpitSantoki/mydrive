import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// if prisma is already defined, use that instance
// otherwise, create a new one
// export default prisma;

// if prisma is already defined, use that instance
// otherwise, create a new one

function getPrisma() {
  const globalAny: any = global;
    if(globalAny){
        console.log("globalAny is defined")
    }
  globalAny.prisma = globalAny.prisma || new PrismaClient();
  return globalAny.prisma;
}

export default getPrisma();
