import { OrderItem } from "@prisma/client";

import prisma from "../utils/prisma";

export const getOrderItem = async () => {
    const orderItem = await prisma.orderItem.findMany();
    return orderItem;
}
export const getOrderItemById = async (id: number) => {
    const orderItem = await prisma.orderItem.findUnique({ where: { id } });
    return orderItem;
}
export const createOrderItem = async (data: Omit<OrderItem, 'id'>) => {
    const orderItem = await prisma.orderItem.create({ data });
    return orderItem;
}
export const updateOrderItem = async (id: number, data: Omit<OrderItem, 'id'>) => {
    const orderItem = await prisma.orderItem.update({ where: { id }, data });
    return orderItem;
}
export const deleteOrderItem = async (id: number) => {
    const orderItem = await prisma.orderItem.delete({ where: { id } });
    return orderItem;
}