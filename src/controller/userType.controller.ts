import { UserType } from "@prisma/client";

import prisma from "../utils/prisma";

export const getUserType = async () => {
    const userTypes = await prisma.userType.findMany();
    return userTypes;
}
export const getUserTypeById = async (id: number) => {
    const userType = await prisma.userType.findUnique({ where: { id } });
    return userType;
}
export const createUserType = async (data: Omit<UserType, 'id'>) => {
    const userType = await prisma.userType.create({ data });
    return userType;
}
export const updateUserType = async (id: number, data: Omit<UserType, 'id'>) => {
    const userType = await prisma.userType.update({ where: { id }, data });
    return userType;
}
export const deleteUserType = async (id: number) => {
    const userType = await prisma.userType.delete({ where: { id } });
    return userType;
}