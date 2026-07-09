import { PrismaClient } from "@prisma/client";
import { prisma } from "../../config/database.js";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
        organization: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
        organization: true,
      },
    });
  }

  async updateLastLogin(id: string) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }
}

export const userRepository = new UserRepository();
