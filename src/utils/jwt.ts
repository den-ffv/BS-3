import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';

const SecretKey = process.env.SECRET_KEY || 'secret';

export const generateToken =(user: User) => {
    return jwt.sign({ id: user.id, username: user.login }, SecretKey, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
}