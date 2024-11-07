import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as AuthController from "../controller/auth.controller";

export const authRouter = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: The user's login
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "P@ssw0rd"
 *             required:
 *               - login
 *               - password
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *       400:
 *         description: Validation errors
 *       500:
 *         description: Internal server error
 */
authRouter.post('/signup',
  body('login').notEmpty().isString(),
  body('password').notEmpty().isString(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await AuthController.signup(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in an existing user
 *     description: Endpoint to sign in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: The user's login
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "P@ssw0rd"
 *             required:
 *               - login
 *               - password
 *     responses:
 *       200:
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
authRouter.post('/signin',
  body('login').notEmpty().isString(),
  body('password').notEmpty().isString(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNIN',request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await AuthController.signin(data);
      
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);
