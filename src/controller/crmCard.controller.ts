import { CrmCard } from "@prisma/client";

import prisma from "../utils/prisma";

export const getCard = async () => {
    const cards = await prisma.crmCard.findMany();
    return cards;
}
export const getCardById = async (id: number) => {
    const card = await prisma.crmCard.findUnique({ where: { id } });
    return card;
}
export const createCard = async (data: Omit<CrmCard, 'id'>) => {
    const card = await prisma.crmCard.create({ data });
    return card;
}
export const updateCard = async (id: number, data: Omit<CrmCard, 'id'>) => {
    const card = await prisma.crmCard.update({ where: { id }, data });
    return card;
}
export const deleteCard = async (id: number) => {
    const card = await prisma.crmCard.delete({ where: { id } });
    return card;
}