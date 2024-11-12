import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as AuthorController from '../controller/author.controller';

export const authorRouter = express.Router();

/**
 * @swagger
 * /author:
 *   post:
 *     tags:
 *       - Author
 *     summary: Create a new author
 *     description: Endpoint to create a new author record in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the author
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Last name of the author
 *                 example: "Doe"
 *               biography:
 *                 type: string
 *                 description: A brief biography of the author
 *                 example: "John Doe is a prolific writer of science fiction."
 *             required:
 *               - firstName
 *               - lastName
 *     responses:
 *       201:
 *         description: The author was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the created author
 *                 firstName:
 *                   type: string
 *                   description: First name of the author
 *                 lastName:
 *                   type: string
 *                   description: Last name of the author
 *                 biography:
 *                   type: string
 *                   description: Biography of the author
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
 *                         description: Error message
 *                       param:
 *                         type: string
 *                         description: Parameter causing the error
 *                       location:
 *                         type: string
 *                         description: Location of the error
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
authorRouter.post('/',
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
  body('biography').if(body('biography').notEmpty()).isString(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await AuthorController.createAuthor(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /author/{id}:
 *   put:
 *     tags:
 *       - Author
 *     summary: Update an existing author
 *     description: Endpoint to update the details of an existing author by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the author to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the author
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Last name of the author
 *                 example: "Doe"
 *               biography:
 *                 type: string
 *                 description: A brief biography of the author
 *                 example: "John Doe is a prolific writer of science fiction."
 *             required:
 *               - firstName
 *               - lastName
 *     responses:
 *       200:
 *         description: The author was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the updated author
 *                 firstName:
 *                   type: string
 *                   description: First name of the author
 *                 lastName:
 *                   type: string
 *                   description: Last name of the author
 *                 biography:
 *                   type: string
 *                   description: Biography of the author
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
 *                         description: Error message
 *                       param:
 *                         type: string
 *                         description: Parameter causing the error
 *                       location:
 *                         type: string
 *                         description: Location of the error
 *       404:
 *         description: Author not found with the provided ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Author not found"
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
authorRouter.put('/:id',
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('biography').if(body('biography').notEmpty()).isString(),
    async (request: Request, response: Response): Promise<any> => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = request.params;
        const data = request.body;
        const updatedRecord = await AuthorController.updateAuthor(Number(id), data);
  
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
 * /author:
 *   get:
 *     tags:
 *       - Author
 *     summary: Retrieve a list of authors
 *     description: Endpoint to fetch a list of all authors in the system.
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID of the author
 *                     example: 1
 *                   firstName:
 *                     type: string
 *                     description: First name of the author
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     description: Last name of the author
 *                     example: "Doe"
 *                   biography:
 *                     type: string
 *                     description: A brief biography of the author
 *                     example: "John Doe is a prolific writer of science fiction."
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
authorRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await AuthorController.getAuthor();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /author/{id}:
 *   get:
 *     tags:
 *       - Author
 *     summary: Retrieve an author by ID
 *     description: Endpoint to fetch details of a specific author by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the author to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Details of the requested author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the author
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   description: First name of the author
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   description: Last name of the author
 *                   example: "Doe"
 *                 biography:
 *                   type: string
 *                   description: A brief biography of the author
 *                   example: "John Doe is a prolific writer of science fiction."
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Author not found"
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
authorRouter.get('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const record = await AuthorController.getAuthorById(Number(id));
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
 * /author/{id}:
 *   delete:
 *     tags:
 *       - Author
 *     summary: Delete an author by ID
 *     description: Endpoint to delete an author by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the author to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Author deleted successfully"
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Author not found"
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
authorRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await AuthorController.deleteAuthor(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});