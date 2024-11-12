import { Publishers } from "@prisma/client";

import prisma from "../utils/prisma";

export const getPublishers = async () => {
    const publishers = await prisma.publishers.findMany();
    return publishers;
}
export const getPublishersById = async (id: number) => {
    const publishers = await prisma.publishers.findUnique({ where: { id } });
    return publishers;
}
export const createPublishers = async (data: Omit<Publishers, 'id'>) => {
    const publishers = await prisma.publishers.create({ data });
    return publishers;
}
export const updatePublishers = async (id: number, data: Omit<Publishers, 'id'>) => {
    const publishers = await prisma.publishers.update({ where: { id }, data });
    return publishers;
}
export const deletePublishers = async (id: number) => {
    const publishers = await prisma.publishers.delete({ where: { id } });
    return publishers;
}