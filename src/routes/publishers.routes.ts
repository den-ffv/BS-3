import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as PublishersController from '../controller/publishers.controller';

export const publishersRouter = express.Router();

/**
 * @swagger
 * /publishers:
 *   post:
 *     tags:
 *       - Publishers
 *     summary: Create a new publisher
 *     description: Endpoint to create a new publisher with name, address, and contact information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the publisher
 *                 example: "Penguin Books"
 *               address:
 *                 type: string
 *                 description: Address of the publisher
 *                 example: "123 Publishing St, New York, NY 10001"
 *               contact:
 *                 type: string
 *                 description: Contact information for the publisher
 *                 example: "+1-800-123-4567"
 *             required:
 *               - name
 *               - address
 *               - contact
 *     responses:
 *       201:
 *         description: Publisher created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the created publisher
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Name of the publisher
 *                   example: "Penguin Books"
 *                 address:
 *                   type: string
 *                   description: Address of the publisher
 *                   example: "123 Publishing St, New York, NY 10001"
 *                 contact:
 *                   type: string
 *                   description: Contact information for the publisher
 *                   example: "+1-800-123-4567"
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
publishersRouter.post('/',
  body('name').notEmpty().isString(),
  body('address').notEmpty().isString(),
  body('contact').notEmpty().isString(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await PublishersController.createPublishers(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /publishers/{id}:
 *   put:
 *     tags:
 *       - Publishers
 *     summary: Update an existing publisher
 *     description: Endpoint to update the details of an existing publisher by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the publisher to be updated
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
 *               name:
 *                 type: string
 *                 description: Name of the publisher
 *                 example: "Penguin Books"
 *               address:
 *                 type: string
 *                 description: Address of the publisher
 *                 example: "123 Publishing St, New York, NY 10001"
 *               contact:
 *                 type: string
 *                 description: Contact information for the publisher
 *                 example: "+1-800-123-4567"
 *             required:
 *               - name
 *               - address
 *               - contact
 *     responses:
 *       200:
 *         description: Publisher updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the updated publisher
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Name of the publisher
 *                   example: "Penguin Books"
 *                 address:
 *                   type: string
 *                   description: Address of the publisher
 *                   example: "123 Publishing St, New York, NY 10001"
 *                 contact:
 *                   type: string
 *                   description: Contact information for the publisher
 *                   example: "+1-800-123-4567"
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
 *         description: Publisher not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Publisher not found"
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
publishersRouter.put('/:id',
    body('name').notEmpty().isString(),
    body('address').notEmpty().isString(),
    body('contact').notEmpty().isString(),
    async (request: Request, response: Response): Promise<any> => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = request.params;
        const data = request.body;
        const updatedRecord = await PublishersController.updatePublishers(Number(id), data);
  
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
 * /publishers:
 *   get:
 *     tags:
 *       - Publishers
 *     summary: Get all publishers
 *     description: Endpoint to retrieve a list of all publishers.
 *     responses:
 *       200:
 *         description: List of publishers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID of the publisher
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Name of the publisher
 *                     example: "Penguin Books"
 *                   address:
 *                     type: string
 *                     description: Address of the publisher
 *                     example: "123 Publishing St, New York, NY 10001"
 *                   contact:
 *                     type: string
 *                     description: Contact information for the publisher
 *                     example: "+1-800-123-4567"
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
publishersRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await PublishersController.getPublishers();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /publishers/{id}:
 *   get:
 *     tags:
 *       - Publishers
 *     summary: Retrieve a publisher by ID
 *     description: Endpoint to fetch a publisher by their unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the publisher to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Publisher found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the publisher
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Name of the publisher
 *                   example: "Penguin Books"
 *                 address:
 *                   type: string
 *                   description: Address of the publisher
 *                   example: "123 Publishing St, New York, NY"
 *                 contact:
 *                   type: string
 *                   description: Contact information for the publisher
 *                   example: "+1-800-123-4567"
 *       404:
 *         description: Publisher not found
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
publishersRouter.get('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const record = await PublishersController.getPublishersById(Number(id));
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
 * /publishers/{id}:
 *   delete:
 *     tags:
 *       - Publishers
 *     summary: Delete a publisher by ID
 *     description: Endpoint to delete a publisher by their unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the publisher to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Publisher successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card deleted successfully"
 *       404:
 *         description: Publisher not found
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
publishersRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await PublishersController.deletePublishers(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});