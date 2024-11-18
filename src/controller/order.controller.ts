import { Order } from "@prisma/client";

import prisma from "../utils/prisma";

export const getOrder = async () => {
    const order = await prisma.order.findMany();
    return order;
}
export const getOrderById = async (id: number) => {
    const order = await prisma.order.findUnique({ where: { id } });
    return order;
}
export const createOrder = async (data: Omit<Order, 'id'>) => {
    const order = await prisma.order.create({ data });
    return order;
}
export const updateOrder = async (id: number, data: Omit<Order, 'id'>) => {
    const order = await prisma.order.update({ where: { id }, data });
    return order;
}
export const deleteOrder = async (id: number) => {
    const order = await prisma.order.delete({ where: { id } });
    return order;
}