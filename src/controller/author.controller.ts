import { Author } from "@prisma/client";

import prisma from "../utils/prisma";

export const getAuthor = async () => {
    const author = await prisma.author.findMany();
    return author;
}
export const getAuthorById = async (id: number) => {
    const author = await prisma.author.findUnique({ where: { id } });
    return author;
}
export const createAuthor = async (data: Omit<Author, 'id'>) => {
    const author = await prisma.author.create({ data });
    return author;
}
export const updateAuthor = async (id: number, data: Omit<Author, 'id'>) => {
    const author = await prisma.author.update({ where: { id }, data });
    return author;
}
export const deleteAuthor = async (id: number) => {
    const author = await prisma.author.delete({ where: { id } });
    return author;
}