import { CrmPaymentCard } from "@prisma/client";

import prisma from "../utils/prisma";

export const getCrmPaymentCard = async () => {
    const crmPaymentCards = await prisma.crmPaymentCard.findMany();
    return crmPaymentCards;
}
export const getCrmPaymentCardById = async (id: number) => {
    const crmPaymentCard = await prisma.crmPaymentCard.findUnique({ where: { id } });
    return crmPaymentCard;
}
export const createCrmPaymentCard = async (data: Omit<CrmPaymentCard, 'id'>) => {
    const crmPaymentCard = await prisma.crmPaymentCard.create({ data });
    return crmPaymentCard;
}
export const updateCrmPaymentCard = async (id: number, data: Omit<CrmPaymentCard, 'id'>) => {
    const crmPaymentCard = await prisma.crmPaymentCard.update({ where: { id }, data });
    return crmPaymentCard;
}
export const deleteCrmPaymentCard = async (id: number) => {
    const crmPaymentCard = await prisma.crmPaymentCard.delete({ where: { id } });
    return crmPaymentCard;
}