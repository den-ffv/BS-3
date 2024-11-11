import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as CrmPaymentCardController from '../controller/crmPaymentCard.controller';

export const crmPaymentCardRouter = express.Router();

/**
 * @swagger
 * /crm_payment_card:
 *   post:
 *     tags:
 *       - Crm Payment Card
 *     summary: Create a new CRM payment card
 *     description: Endpoint to create a new CRM payment card associated with a CRM card.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               card_title:
 *                 type: string
 *                 description: Title of the payment card
 *                 example: "Corporate Card"
 *               card_number:
 *                 type: string
 *                 description: Payment card number
 *                 example: "1234-5678-9012-3456"
 *               date_end:
 *                 type: string
 *                 format: date
 *                 description: Expiration date of the card in ISO8601 format
 *                 example: "2025-12-31"
 *               crm_crard_id:
 *                 type: integer
 *                 description: ID of the associated CRM card
 *                 example: 1
 *             required:
 *               - card_title
 *               - card_number
 *               - date_end
 *               - crm_crard_id
 *     responses:
 *       201:
 *         description: The CRM payment card was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the created CRM payment card
 *                 card_title:
 *                   type: string
 *                   description: Title of the payment card
 *                 card_number:
 *                   type: string
 *                   description: Payment card number
 *                 date_end:
 *                   type: string
 *                   format: date
 *                   description: Expiration date of the card
 *                 crm_crard_id:
 *                   type: integer
 *                   description: ID of the associated CRM card
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
crmPaymentCardRouter.post('/',
  body('card_title').notEmpty().isString(),
  body('card_number').notEmpty().isString(),
  body('date_end').notEmpty().isISO8601().toDate(),
  body('crm_crard_id').notEmpty().isInt(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await CrmPaymentCardController.createCrmPaymentCard(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /crm_payment_card/{id}:
 *   put:
 *     tags:
 *       - Crm Payment Card
 *     summary: Update an existing CRM payment card
 *     description: Endpoint to update an existing CRM payment card associated with a CRM card.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the CRM payment card to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               card_title:
 *                 type: string
 *                 description: Title of the payment card
 *                 example: "Corporate Card"
 *               card_number:
 *                 type: string
 *                 description: Payment card number
 *                 example: "1234-5678-9012-3456"
 *               date_end:
 *                 type: string
 *                 format: date
 *                 description: Expiration date of the card in ISO8601 format
 *                 example: "2025-12-31"
 *               crm_crard_id:
 *                 type: integer
 *                 description: ID of the associated CRM card
 *                 example: 1
 *             required:
 *               - card_title
 *               - card_number
 *               - date_end
 *               - crm_crard_id
 *     responses:
 *       200:
 *         description: The CRM payment card was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the updated CRM payment card
 *                 card_title:
 *                   type: string
 *                   description: Title of the payment card
 *                 card_number:
 *                   type: string
 *                   description: Payment card number
 *                 date_end:
 *                   type: string
 *                   format: date
 *                   description: Expiration date of the card
 *                 crm_crard_id:
 *                   type: integer
 *                   description: ID of the associated CRM card
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
 *         description: CRM payment card not found
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
crmPaymentCardRouter.put('/:id',
    body('card_title').notEmpty().isString(),
    body('card_number').notEmpty().isString(),
    body('date_end').notEmpty().isISO8601().toDate(),
    body('crm_crard_id').notEmpty().isInt(),
    async (request: Request, response: Response): Promise<any> => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = request.params;
        const data = request.body;
        const updatedRecord = await CrmPaymentCardController.updateCrmPaymentCard(Number(id), data);
  
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
 * /crm_payment_card:
 *   get:
 *     tags:
 *       - Crm Payment Card
 *     summary: Retrieve all CRM payment cards
 *     description: Endpoint to retrieve a list of all CRM payment cards.
 *     responses:
 *       200:
 *         description: A list of CRM payment cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID of the CRM payment card
 *                   card_title:
 *                     type: string
 *                     description: Title of the payment card
 *                   card_number:
 *                     type: string
 *                     description: Payment card number
 *                   date_end:
 *                     type: string
 *                     format: date
 *                     description: Expiration date of the card
 *                   crm_crard_id:
 *                     type: integer
 *                     description: ID of the associated CRM card
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
crmPaymentCardRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await CrmPaymentCardController.getCrmPaymentCard();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /crm_payment_card/{id}:
 *   get:
 *     tags:
 *       - Crm Payment Card
 *     summary: Retrieve a CRM payment card by ID
 *     description: Endpoint to retrieve a specific CRM payment card by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the CRM payment card
 *     responses:
 *       200:
 *         description: CRM payment card data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the CRM payment card
 *                 card_title:
 *                   type: string
 *                   description: Title of the payment card
 *                 card_number:
 *                   type: string
 *                   description: Payment card number
 *                 date_end:
 *                   type: string
 *                   format: date
 *                   description: Expiration date of the card
 *                 crm_crard_id:
 *                   type: integer
 *                   description: ID of the associated CRM card
 *       404:
 *         description: CRM card not found
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
crmPaymentCardRouter.get('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const record = await CrmPaymentCardController.getCrmPaymentCardById(Number(id));
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
 * /crm_payment_card/{id}:
 *   delete:
 *     tags:
 *       - Crm Payment Card
 *     summary: Delete a CRM payment card by ID
 *     description: Endpoint to delete a specific CRM payment card by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the CRM payment card to delete
 *     responses:
 *       200:
 *         description: CRM payment card deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card deleted successfully"
 *       404:
 *         description: CRM card not found
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
crmPaymentCardRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await CrmPaymentCardController.deleteCrmPaymentCard(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});