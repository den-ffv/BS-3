import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as CrmEmailController from '../controller/crmEmail.controller';

export const crmEmailRouter = express.Router();

/**
 * @swagger
 * /crm_email:
 *   post:
 *     tags:
 *       - Crm Email
 *     summary: Create a new CRM email
 *     description: Endpoint to create a new CRM email associated with a CRM card.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address associated with the CRM card
 *                 example: "user@example.com"
 *               is_main:
 *                 type: boolean
 *                 description: Indicates if this is the main email
 *                 example: true
 *               crm_crard_id:
 *                 type: integer
 *                 description: The unique ID of the associated CRM card
 *                 example: 1
 *             required:
 *               - email
 *               - is_main
 *               - crm_crard_id
 *     responses:
 *       201:
 *         description: The CRM email was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the created CRM email
 *                 email:
 *                   type: string
 *                   description: The email address
 *                 is_main:
 *                   type: boolean
 *                   description: Indicates if this is the main email
 *                 crm_crard_id:
 *                   type: integer
 *                   description: The ID of the associated CRM card
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
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
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
crmEmailRouter.post('/',
  body('email').notEmpty().isString(),
  body('is_main').notEmpty().isBoolean(),
  body('crm_crard_id').notEmpty().isInt(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await CrmEmailController.createCrmEmail(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /crm_email/{id}:
 *   put:
 *     tags:
 *       - Crm Email
 *     summary: Update an existing CRM email
 *     description: Endpoint to update the details of an existing CRM email associated with a CRM card.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the CRM email to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The updated email address associated with the CRM card
 *                 example: "updated_user@example.com"
 *               is_main:
 *                 type: boolean
 *                 description: Indicates if this is the main email
 *                 example: true
 *               crm_crard_id:
 *                 type: integer
 *                 description: The unique ID of the associated CRM card
 *                 example: 1
 *             required:
 *               - email
 *               - is_main
 *               - crm_crard_id
 *     responses:
 *       200:
 *         description: The CRM email was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the updated CRM email
 *                 email:
 *                   type: string
 *                   description: The email address
 *                 is_main:
 *                   type: boolean
 *                   description: Indicates if this is the main email
 *                 crm_crard_id:
 *                   type: integer
 *                   description: The ID of the associated CRM card
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
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *       404:
 *         description: CRM email not found
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
crmEmailRouter.put('/:id',
    body('email').notEmpty().isString(),
    body('is_main').notEmpty().isBoolean(),
    body('crm_crard_id').notEmpty().isInt(),
    async (request: Request, response: Response): Promise<any> => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = request.params;
        const data = request.body;
        const updatedRecord = await CrmEmailController.updateCrmEmail(Number(id), data);
  
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
 * /crm_email:
 *   get:
 *     tags:
 *       - Crm Email
 *     summary: Retrieve all CRM emails
 *     description: Endpoint to get a list of all CRM emails.
 *     responses:
 *       200:
 *         description: A list of CRM emails
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique ID of the CRM email
 *                     example: 1
 *                   email:
 *                     type: string
 *                     description: The email address associated with the CRM card
 *                     example: "user@example.com"
 *                   is_main:
 *                     type: boolean
 *                     description: Indicates if this is the main email
 *                     example: true
 *                   crm_crard_id:
 *                     type: integer
 *                     description: The ID of the associated CRM card
 *                     example: 1
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
crmEmailRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await CrmEmailController.getCrmEmail();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /crm_email/{id}:
 *   get:
 *     tags:
 *       - Crm Email
 *     summary: Retrieve a CRM email by ID
 *     description: Endpoint to get the details of a specific CRM email by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the CRM email to retrieve
 *     responses:
 *       200:
 *         description: Details of the specified CRM email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the CRM email
 *                   example: 1
 *                 email:
 *                   type: string
 *                   description: The email address associated with the CRM card
 *                   example: "user@example.com"
 *                 is_main:
 *                   type: boolean
 *                   description: Indicates if this is the main email
 *                   example: true
 *                 crm_crard_id:
 *                   type: integer
 *                   description: The ID of the associated CRM card
 *                   example: 1
 *       404:
 *         description: CRM email not found
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
crmEmailRouter.get('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const record = await CrmEmailController.getCrmEmailById(Number(id));
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
 * /crm_email/{id}:
 *   delete:
 *     tags:
 *       - Crm Email
 *     summary: Delete a CRM email by ID
 *     description: Endpoint to delete a specific CRM email by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the CRM email to delete
 *     responses:
 *       200:
 *         description: The CRM email was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card deleted successfully"
 *       404:
 *         description: CRM email not found
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
crmEmailRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await CrmEmailController.deleteCrmEmail(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});