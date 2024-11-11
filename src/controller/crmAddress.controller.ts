import { CrmAddress } from "@prisma/client";

import prisma from "../utils/prisma";

export const getCrmAddress = async () => {
    const crmAddress = await prisma.crmAddress.findMany();
    return crmAddress;
}
export const getCrmAddressById = async (id: number) => {
    const crmAddress = await prisma.crmAddress.findUnique({ where: { id } });
    return crmAddress;
}
export const createCrmAddress = async (data: Omit<CrmAddress, 'id'>) => {
    const crmAddress = await prisma.crmAddress.create({ data });
    return crmAddress;
}
export const updateCrmAddress = async (id: number, data: Omit<CrmAddress, 'id'>) => {
    const crmAddress = await prisma.crmAddress.update({ where: { id }, data });
    return crmAddress;
}
export const deleteCrmAddress = async (id: number) => {
    const crmAddress = await prisma.crmAddress.delete({ where: { id } });
    return crmAddress;
}