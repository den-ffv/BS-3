import { OrderStatus } from "@prisma/client";

import prisma from "../utils/prisma";

export const getOrderStatus = async () => {
    const orderStatus = await prisma.orderStatus.findMany();
    return orderStatus;
}
export const getOrderStatusById = async (id: number) => {
    const orderStatus = await prisma.orderStatus.findUnique({ where: { id } });
    return orderStatus;
}
export const createOrderStatus = async (data: Omit<OrderStatus, 'id'>) => {
    const orderStatus = await prisma.orderStatus.create({ data });
    return orderStatus;
}
export const updateOrderStatus = async (id: number, data: Omit<OrderStatus, 'id'>) => {
    const orderStatus = await prisma.orderStatus.update({ where: { id }, data });
    return orderStatus;
}
export const deleteOrderStatus = async (id: number) => {
    const orderStatus = await prisma.orderStatus.delete({ where: { id } });
    return orderStatus;
}