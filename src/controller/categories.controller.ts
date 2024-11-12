import { Categories } from "@prisma/client";

import prisma from "../utils/prisma";

export const getCategories = async () => {
    const categories = await prisma.categories.findMany();
    return categories;
}
export const getCategoriesById = async (id: number) => {
    const categories = await prisma.categories.findUnique({ where: { id } });
    return categories;
}
export const createCategories = async (data: Omit<Categories, 'id'>) => {
    const categories = await prisma.categories.create({ data });
    return categories;
}
export const updateCategories = async (id: number, data: Omit<Categories, 'id'>) => {
    const categories = await prisma.categories.update({ where: { id }, data });
    return categories;
}
export const deleteCategories = async (id: number) => {
    const categories = await prisma.categories.delete({ where: { id } });
    return categories;
}