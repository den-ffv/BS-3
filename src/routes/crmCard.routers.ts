import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as CrmCardController from '../controller/crmCard.controller';

export const crmCardRouter = express.Router();

/**
 * @swagger
 * /crm_card:
 *   post:
 *     tags:
 *       - CRM Cards
 *     summary: Create a new CRM card
 *     description: Endpoint to create a new CRM card associated with a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: The user's first name
 *                 example: "John"
 *               user_surname:
 *                 type: string
 *                 description: The user's last name
 *                 example: "Doe"
 *               user_patronymic:
 *                 type: string
 *                 description: The user's patronymic (middle name)
 *                 example: "Smith"
 *               title_card:
 *                 type: string
 *                 description: The title of the CRM card
 *                 example: "Premium Member"
 *               active:
 *                 type: boolean
 *                 description: Indicates if the CRM card is active
 *                 example: true
 *               card_photo:
 *                 type: string
 *                 description: URL to the card photo
 *                 example: "https://example.com/images/card_photo.jpg"
 *               user_id:
 *                 type: integer
 *                 description: The unique ID of the user
 *                 example: 1
 *               user_type_id:
 *                 type: integer
 *                 description: The ID of the user type
 *                 example: 2
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The user's date of birth in ISO8601 format
 *                 example: "1990-01-01"
 *             required:
 *               - user_id
 *               - user_type_id
 *     responses:
 *       201:
 *         description: The CRM card was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the created CRM card
 *                 user_name:
 *                   type: string
 *                   description: The user's first name
 *                 user_surname:
 *                   type: string
 *                   description: The user's last name
 *                 user_patronymic:
 *                   type: string
 *                   description: The user's patronymic
 *                 title_card:
 *                   type: string
 *                   description: The title of the CRM card
 *                 active:
 *                   type: boolean
 *                   description: Whether the card is active
 *                 card_photo:
 *                   type: string
 *                   description: URL to the card photo
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the associated user
 *                 user_type_id:
 *                   type: integer
 *                   description: The ID of the user type
 *                 birthday:
 *                   type: string
 *                   format: date
 *                   description: The user's date of birth
 *       400:
 *         description: Validation errors
 *       500:
 *         description: Internal server error
 */
crmCardRouter.post(
  '/',
  body('user_name').if(body('user_name').notEmpty()).isString(),
  body('user_surname').if(body('user_surname').notEmpty()).isString(),
  body('user_patronymic').if(body('user_patronymic').notEmpty()).isString(),
  body('title_card').if(body('title_card').notEmpty()).isString(),
  body('active').if(body('active').notEmpty()).isBoolean(),
  body('card_photo').if(body('card_photo').notEmpty()).isString(),
  body('user_id').notEmpty().isInt(),
  body('user_type_id').notEmpty().isInt(),
  body('birthday').if(body('birthday').notEmpty()).isISO8601().toDate(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await CrmCardController.createCard(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /crm_card/{id}:
 *   put:
 *     tags:
 *       - CRM Cards
 *     summary: Update an existing CRM card
 *     description: Endpoint to update an existing CRM card's information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the CRM card to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: The user's first name
 *                 example: "John"
 *               user_surname:
 *                 type: string
 *                 description: The user's last name
 *                 example: "Doe"
 *               user_patronymic:
 *                 type: string
 *                 description: The user's patronymic (middle name)
 *                 example: "Smith"
 *               title_card:
 *                 type: string
 *                 description: The title of the CRM card
 *                 example: "Premium Member"
 *               active:
 *                 type: boolean
 *                 description: Indicates if the CRM card is active
 *                 example: true
 *               card_photo:
 *                 type: string
 *                 description: URL to the card photo
 *                 example: "https://example.com/images/card_photo.jpg"
 *               user_id:
 *                 type: integer
 *                 description: The unique ID of the user
 *                 example: 1
 *               user_type_id:
 *                 type: integer
 *                 description: The ID of the user type
 *                 example: 2
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The user's date of birth in ISO8601 format
 *                 example: "1990-01-01"
 *     responses:
 *       200:
 *         description: The CRM card was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the updated CRM card
 *                 user_name:
 *                   type: string
 *                   description: The user's first name
 *                 user_surname:
 *                   type: string
 *                   description: The user's last name
 *                 user_patronymic:
 *                   type: string
 *                   description: The user's patronymic
 *                 title_card:
 *                   type: string
 *                   description: The title of the CRM card
 *                 active:
 *                   type: boolean
 *                   description: Whether the card is active
 *                 card_photo:
 *                   type: string
 *                   description: URL to the card photo
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the associated user
 *                 user_type_id:
 *                   type: integer
 *                   description: The ID of the user type
 *                 birthday:
 *                   type: string
 *                   format: date
 *                   description: The user's date of birth
 *       400:
 *         description: Validation errors
 *       404:
 *         description: CRM card not found
 *       500:
 *         description: Internal server error
 */
crmCardRouter.put(
    '/:id',
    body('user_name').if(body('user_name').notEmpty()).isString(),
    body('user_surname').if(body('user_surname').notEmpty()).isString(),
    body('user_patronymic').if(body('user_patronymic').notEmpty()).isString(),
    body('title_card').if(body('title_card').notEmpty()).isString(),
    body('active').if(body('active').notEmpty()).isBoolean(),
    body('card_photo').if(body('card_photo').notEmpty()).isString(),
    body('user_id').optional().isInt(),
    body('user_type_id').optional().isInt(),
    body('birthday').if(body('birthday').notEmpty()).isISO8601().toDate(),
    async (request: Request, response: Response): Promise<any> => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = request.params;
        const data = request.body;
        const updatedRecord = await CrmCardController.updateCard(Number(id), data);
  
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
 * /crm_card:
 *   get:
 *     tags:
 *       - CRM Cards
 *     summary: Get all crm cards
 *     description: Endpoint to get all crm cards
 *     responses:
 *       200:
 *         description: The list of crm cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID
 *       500:
 *         description: Internal server error
 */
crmCardRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await CrmCardController.getCard();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /crm_card/{id}:
 *   get:
 *     tags:
 *       - CRM Cards
 *     summary: Get a CRM card by ID
 *     description: Retrieve a specific CRM card by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the CRM card
 *     responses:
 *       200:
 *         description: The details of the requested CRM card
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the CRM card
 *                 user_name:
 *                   type: string
 *                   description: The user's first name
 *                 user_surname:
 *                   type: string
 *                   description: The user's last name
 *                 user_patronymic:
 *                   type: string
 *                   description: The user's patronymic
 *                 title_card:
 *                   type: string
 *                   description: The title of the CRM card
 *                 active:
 *                   type: boolean
 *                   description: Indicates if the CRM card is active
 *                 card_photo:
 *                   type: string
 *                   description: URL to the card photo
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the associated user
 *                 user_type_id:
 *                   type: integer
 *                   description: The ID of the user type
 *                 birthday:
 *                   type: string
 *                   format: date
 *                   description: The user's date of birth
 *       404:
 *         description: CRM card not found
 *       500:
 *         description: Internal server error
 */
crmCardRouter.get('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const record = await CrmCardController.getCardById(Number(id));
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
 * /crm_card/{id}:
 *   delete:
 *     tags:
 *       - CRM Cards
 *     summary: Delete a CRM card by ID
 *     description: Endpoint to delete a specific CRM card by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the CRM card to delete
 *     responses:
 *       200:
 *         description: The CRM card was successfully deleted
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
 *       500:
 *         description: Internal server error
 */
crmCardRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await CrmCardController.deleteCard(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});
