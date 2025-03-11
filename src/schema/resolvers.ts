import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    products: async () => await prisma.product.findMany({ include: { category: true } }),
    product: async (_: any, { id }: { id: string }) => await prisma.product.findUnique({ where: { id }, include: { category: true } }),
    categories: async () => await prisma.category.findMany({ include: { products: true } }),
    category: async (_: any, { id }: { id: string }) => await prisma.category.findUnique({ where: { id }, include: { products: true } }),
  },

  Mutation: {
    addProduct: async (_: any, { name, price, description, categoryId }: { name: string; price: number; description?: string; categoryId: string }) => {
      return await prisma.product.create({
        data: { name, price, description, categoryId },
      });
    },
    updateProduct: async (_: any, { id, name, price, description, categoryId }: { id: string; name?: string; price?: number; description?: string; categoryId?: string }) => {
      return await prisma.product.update({
        where: { id },
        data: { name, price, description, categoryId },
      });
    },
    deleteProduct: async (_: any, { id }: { id: string }) => {
      await prisma.product.delete({ where: { id } });
      return `Product ${id} deleted.`;
    },
    addCategory: async (_: any, { name }: { name: string }) => {
      return await prisma.category.create({
        data: { name },
      });
    },
    updateCategory: async (_: any, { id, name }: { id: string; name?: string }) => {
      return await prisma.category.update({
        where: { id },
        data: { name },
      });
    },
    deleteCategory: async (_: any, { id }: { id: string }) => {
      await prisma.category.delete({ where: { id } });
      return `Category ${id} deleted.`;
    },
  },

  Product: {
    category: async (product: { categoryId: string }) => {
      return await prisma.category.findUnique({ where: { id: product.categoryId } });
    },
  },

  Category: {
    products: async (category: { id: string }) => {
      return await prisma.product.findMany({ where: { categoryId: category.id } });
    },
  },
};
