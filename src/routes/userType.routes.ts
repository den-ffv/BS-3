import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as UserTypeController from '../controller/userType.controller';

export const userTypeRouter = express.Router();

/**
 * @swagger
 * /user_type:
 *   post:
 *     tags:
 *       - User Type
 *     summary: Create a new user type
 *     description: Endpoint to create a new user type with specified roles and permissions.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The name of the user type
 *                 example: "Manager"
 *               is_admin:
 *                 type: boolean
 *                 description: Indicates if the user type has admin privileges
 *                 example: false
 *               is_menejer:
 *                 type: boolean
 *                 description: Indicates if the user type has manager privileges
 *                 example: true
 *               is_user:
 *                 type: boolean
 *                 description: Indicates if the user type has user privileges
 *                 example: true
 *             required:
 *               - title
 *               - is_admin
 *               - is_menejer
 *               - is_user
 *     responses:
 *       201:
 *         description: User type successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the created user type
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The name of the user type
 *                   example: "Manager"
 *                 is_admin:
 *                   type: boolean
 *                   description: Indicates if the user type has admin privileges
 *                   example: false
 *                 is_menejer:
 *                   type: boolean
 *                   description: Indicates if the user type has manager privileges
 *                   example: true
 *                 is_user:
 *                   type: boolean
 *                   description: Indicates if the user type has user privileges
 *                   example: true
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Description of the validation error
 *                       param:
 *                         type: string
 *                         description: Parameter that caused the error
 *                       location:
 *                         type: string
 *                         description: Location of the parameter (e.g., "body")
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
userTypeRouter.post('/',
  body('title').notEmpty().isString(),
  body('is_admin').notEmpty().isBoolean(),
  body('is_menejer').notEmpty().isBoolean(),
  body('is_user').notEmpty().isBoolean(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await UserTypeController.createUserType(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /user_type/{id}:
 *   put:
 *     tags:
 *       - User Type
 *     summary: Update an existing user type
 *     description: Endpoint to update an existing user type with specified roles and permissions by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the user type to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The name of the user type
 *                 example: "Manager"
 *               is_admin:
 *                 type: boolean
 *                 description: Indicates if the user type has admin privileges
 *                 example: false
 *               is_menejer:
 *                 type: boolean
 *                 description: Indicates if the user type has manager privileges
 *                 example: true
 *               is_user:
 *                 type: boolean
 *                 description: Indicates if the user type has user privileges
 *                 example: true
 *             required:
 *               - title
 *               - is_admin
 *               - is_menejer
 *               - is_user
 *     responses:
 *       200:
 *         description: User type successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the updated user type
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The name of the user type
 *                   example: "Manager"
 *                 is_admin:
 *                   type: boolean
 *                   description: Indicates if the user type has admin privileges
 *                   example: false
 *                 is_menejer:
 *                   type: boolean
 *                   description: Indicates if the user type has manager privileges
 *                   example: true
 *                 is_user:
 *                   type: boolean
 *                   description: Indicates if the user type has user privileges
 *                   example: true
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Description of the validation error
 *                       param:
 *                         type: string
 *                         description: Parameter that caused the error
 *                       location:
 *                         type: string
 *                         description: Location of the parameter (e.g., "body")
 *       404:
 *         description: User type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User type not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
userTypeRouter.put('/:id',
    body('title').notEmpty().isString(),
    body('is_admin').notEmpty().isBoolean(),
    body('is_menejer').notEmpty().isBoolean(),
    body('is_user').notEmpty().isBoolean(),
    async (request: Request, response: Response): Promise<any> => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = request.params;
        const data = request.body;
        const updatedRecord = await UserTypeController.updateUserType(Number(id), data);
  
        if (!updatedRecord) {
          return response.status(404).json({ message: 'CRM card not found' });
        }
  
        return response.status(200).json(updatedRecord);
      } catch (error: any) {
        return response.status(500).json({ message: error.message });
      }
    }
  );
  
/**
 * @swagger
 * /user_type:
 *   get:
 *     tags:
 *       - User Type
 *     summary: Retrieve all user types
 *     description: Endpoint to retrieve a list of all user types with their details.
 *     responses:
 *       200:
 *         description: A list of user types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique ID of the user type
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The name of the user type
 *                     example: "Manager"
 *                   is_admin:
 *                     type: boolean
 *                     description: Indicates if the user type has admin privileges
 *                     example: false
 *                   is_menejer:
 *                     type: boolean
 *                     description: Indicates if the user type has manager privileges
 *                     example: true
 *                   is_user:
 *                     type: boolean
 *                     description: Indicates if the user type has user privileges
 *                     example: true
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
userTypeRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await UserTypeController.getUserType();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user_type/{id}:
 *   get:
 *     tags:
 *       - User Type
 *     summary: Retrieve a specific user type by ID
 *     description: Endpoint to retrieve a user type's details based on its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the user type
 *     responses:
 *       200:
 *         description: Details of the specified user type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the user type
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The name of the user type
 *                   example: "Manager"
 *                 is_admin:
 *                   type: boolean
 *                   description: Indicates if the user type has admin privileges
 *                   example: false
 *                 is_menejer:
 *                   type: boolean
 *                   description: Indicates if the user type has manager privileges
 *                   example: true
 *                 is_user:
 *                   type: boolean
 *                   description: Indicates if the user type has user privileges
 *                   example: true
 *       404:
 *         description: User type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
userTypeRouter.get('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const record = await UserTypeController.getUserTypeById(Number(id));
    if (!record) {
      return response.status(404).json({ message: 'CRM card not found' });
    }
    return response.status(200).json(record);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user_type/{id}:
 *   delete:
 *     tags:
 *       - User Type
 *     summary: Delete a user type by ID
 *     description: Endpoint to delete a specific user type by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the user type to be deleted
 *     responses:
 *       200:
 *         description: User type successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card deleted successfully"
 *       404:
 *         description: User type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
userTypeRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await UserTypeController.deleteUserType(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});
