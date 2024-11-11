import { CrmEmail } from "@prisma/client";

import prisma from "../utils/prisma";

export const getCrmEmail = async () => {
    const crmEmails = await prisma.crmEmail.findMany();
    return crmEmails;
}
export const getCrmEmailById = async (id: number) => {
    const crmEmail = await prisma.crmEmail.findUnique({ where: { id } });
    return crmEmail;
}
export const createCrmEmail = async (data: Omit<CrmEmail, 'id'>) => {
    const crmEmail = await prisma.crmEmail.create({ data });
    return crmEmail;
}
export const updateCrmEmail = async (id: number, data: Omit<CrmEmail, 'id'>) => {
    const crmEmail = await prisma.crmEmail.update({ where: { id }, data });
    return crmEmail;
}
export const deleteCrmEmail = async (id: number) => {
    const crmEmail = await prisma.crmEmail.delete({ where: { id } });
    return crmEmail;
}