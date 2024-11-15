/// <reference path="../types.d.ts" />

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token required" });
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY || 'test', (err, user) => {
    if (err) {
      console.log("Invalid token:", err.message);
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    }

    req.user = user;
    next();
  });
};