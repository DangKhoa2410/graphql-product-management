import { products } from "../data/products";
import { categories } from "../data/categories";

export const resolvers = {
  Query: {
    
    products: () => products,
    product: (_: any, { id }: { id: string }) => products.find((p) => p.id === id),
    categories: () => categories,
    category: (_: any, { id }: { id: string }) => categories.find((c) => c.id === id),
  },

  Mutation: {
    addProduct: (_: any, { name, price, description, categoryId }: { name: string; price: number; description?: string; categoryId: string }) => {
      const newProduct = { id: `${products.length + 1}`, name, price, description, categoryId };
      products.push(newProduct);
      return newProduct;
    },
    updateProduct: (_: any, { id, name, price, description, categoryId }: { id: string; name?: string; price?: number; description?: string; categoryId?: string }) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      if (name) product.name = name;
      if (price) product.price = price;
      if (description) product.description = description;
      if (categoryId) product.categoryId = categoryId;
      return product;
    },
    deleteProduct: (_: any, { id }: { id: string }) => {
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) return "Product not found.";
      products.splice(index, 1);
      return `Product ${id} deleted.`;
    },
    addCategory: (_: any, { name }: { name: string }) => {
      const newCategory = { id: `${categories.length + 1}`, name };
      categories.push(newCategory);
      return newCategory;
    },
    updateCategory: (_: any, { id, name }: { id: string; name?: string }) => {
      const category = categories.find((c) => c.id === id);
      if (!category) return null;
      if (name) category.name = name;
      return category;
    },
    deleteCategory: (_: any, { id }: { id: string }) => {
      const index = categories.findIndex((c) => c.id === id);
      if (index === -1) return "Category not found.";
      categories.splice(index, 1);
      return `Category ${id} deleted.`;
    },
  },

  Product: {
    category: (product: { categoryId: string }) => categories.find((c) => c.id === product.categoryId),
  },

  Category: {
    products: (category: { id: string }) => products.filter((p) => p.categoryId === category.id),
  },
};
