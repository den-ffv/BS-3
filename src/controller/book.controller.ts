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
export const getBookByFilter = async (filters: {
    author_id?: number;
    category_id?: number;
    publisher_id?: number;
    min_price?: number;
    max_price?: number;
}) => {
    const { author_id, category_id, publisher_id, min_price, max_price } = filters;

    const where: any = {};

    if (author_id) where.author_id = author_id;
    if (category_id) where.category_id = category_id;
    if (publisher_id) where.publisher_id = publisher_id;
    if (min_price !== undefined) where.price = { gte: min_price };
    if (max_price !== undefined) where.price = { ...where.price, lte: max_price };

    const books = await prisma.book.findMany({
        where: where,
        include: {
            author: true,
            category: true,
            publisher: true,
        },
    });

    return books;
};
