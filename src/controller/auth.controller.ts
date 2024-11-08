import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

import prisma from '../utils/prisma';
import { exclude } from '../utils/func';



export const signup = async (data: Omit<User, 'id'>) => {
  const { login, password } = data;

  const saltRounds = 5;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({ data: { login, password: hash } });
  
  if (!user) {
    throw new Error('Error creating user');
  }
  const userType = await prisma.userType.findFirst({ where: { is_user: true } });
  if (!userType) {
    throw new Error('UserType not found');
  }

  const crmCard = await prisma.crmCard.create({
    data: {
      user_id: user.id,
      user_type_id: userType?.id,
    },
    include: { user_type: true }
  });
  return { user: exclude(user, ['password']), user_crm: crmCard }
}

export const signin = async (data: Omit<User, 'id'>) => {
  const { login, password } = data;

  const user = await prisma.user.findUnique({ where: { login } });

  if(!user) {
    throw new Error('User not found');
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    throw new Error('Invalid password');
  }

  const userCrmCard = await prisma.crmCard.findFirst({ where: { user_id: user.id }, include: { user_type: true } });

  return { user: exclude(user, ['password']), user_crm: userCrmCard }
}
