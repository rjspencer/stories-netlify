import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const incrementVisitorCount = async () => {
  let visitorCount = await prisma.visitorCount.findFirst();
  if (!visitorCount) {
    visitorCount = await prisma.visitorCount.create({
      data: { count: 1 },
    });
  } else {
    visitorCount = await prisma.visitorCount.update({
      where: { id: visitorCount.id },
      data: { count: visitorCount.count + 1 },
    });
  }
  return visitorCount.count;
};
