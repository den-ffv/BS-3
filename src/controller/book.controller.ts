import { Book } from "@prisma/client";

import prisma from "../utils/prisma";

export const getBook = async () => {
    const book = await prisma.book.findMany({include: {author: true, category: true, publisher: true}});
    return book;
}
export const getBookById = async (id: number) => {
    const book = await prisma.book.findUnique({ where: { id }, include: {author: true, category: true, publisher: true} });
    return book;
}
export const createBook = async (data: Omit<Book, 'id'>) => {
    const book = await prisma.book.create({ data });
    return book;
}
export const updateBook = async (id: number, data: Omit<Book, 'id'>) => {
    const book = await prisma.book.update({ where: { id }, data });
    return book;
}
export const deleteBook = async (id: number) => {
    const book = await prisma.book.delete({ where: { id } });
    return book;
}