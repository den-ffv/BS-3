import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as CrmAddressController from '../controller/crmAddress.controller';

export const crmAddressRouter = express.Router();

/**
 * @swagger
 * /crm_address:
 *   post:
 *     tags:
 *       - Crm Address
 *     summary: Create a new CRM address
 *     description: Endpoint to create a new address associated with a CRM card.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *                 description: Country of the address
 *                 example: "Ukraine"
 *               city:
 *                 type: string
 *                 description: City of the address
 *                 example: "Kyiv"
 *               street:
 *                 type: string
 *                 description: Street name of the address
 *                 example: "Shevchenka Avenue"
 *               house:
 *                 type: string
 *                 description: House number of the address
 *                 example: "12"
 *               apartment:
 *                 type: string
 *                 description: Apartment number of the address
 *                 example: "25"
 *               crm_crard_id:
 *                 type: integer
 *                 description: ID of the associated CRM card
 *                 example: 1
 *             required:
 *               - country
 *               - city
 *               - street
 *               - house
 *               - apartment
 *               - crm_crard_id
 *     responses:
 *       201:
 *         description: The CRM address was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the created CRM address
 *                 country:
 *                   type: string
 *                   description: Country of the address
 *                 city:
 *                   type: string
 *                   description: City of the address
 *                 street:
 *                   type: string
 *                   description: Street name of the address
 *                 house:
 *                   type: string
 *                   description: House number of the address
 *                 apartment:
 *                   type: string
 *                   description: Apartment number of the address
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
crmAddressRouter.post('/',
  body('country').notEmpty().isString(),
  body('city').notEmpty().isString(),
  body('street').notEmpty().isString(),
  body('house').notEmpty().isString(),
  body('apartment').notEmpty().isString(),
  body('crm_crard_id').notEmpty().isInt(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await CrmAddressController.createCrmAddress(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /crm_address/{id}:
 *   put:
 *     tags:
 *       - Crm Address
 *     summary: Update an existing CRM address
 *     description: Endpoint to update an existing CRM address by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the CRM address to be updated
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
 *               country:
 *                 type: string
 *                 description: Country of the address
 *                 example: "Ukraine"
 *               city:
 *                 type: string
 *                 description: City of the address
 *                 example: "Kyiv"
 *               street:
 *                 type: string
 *                 description: Street name of the address
 *                 example: "Shevchenka Avenue"
 *               house:
 *                 type: string
 *                 description: House number of the address
 *                 example: "12"
 *               apartment:
 *                 type: string
 *                 description: Apartment number of the address
 *                 example: "25"
 *               crm_crard_id:
 *                 type: integer
 *                 description: ID of the associated CRM card
 *                 example: 1
 *             required:
 *               - country
 *               - city
 *               - street
 *               - house
 *               - apartment
 *               - crm_crard_id
 *     responses:
 *       200:
 *         description: The CRM address was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the updated CRM address
 *                 country:
 *                   type: string
 *                   description: Country of the address
 *                 city:
 *                   type: string
 *                   description: City of the address
 *                 street:
 *                   type: string
 *                   description: Street name of the address
 *                 house:
 *                   type: string
 *                   description: House number of the address
 *                 apartment:
 *                   type: string
 *                   description: Apartment number of the address
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
 *         description: CRM address not found with the provided ID
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
crmAddressRouter.put('/:id',
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
        const updatedRecord = await CrmAddressController.updateCrmAddress(Number(id), data);
  
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
 * /crm_address:
 *   get:
 *     tags:
 *       - Crm Address
 *     summary: Get a list of all CRM addresses
 *     description: Endpoint to retrieve all CRM addresses from the system.
 *     responses:
 *       200:
 *         description: A list of CRM addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID of the CRM address
 *                   country:
 *                     type: string
 *                     description: Country of the address
 *                   city:
 *                     type: string
 *                     description: City of the address
 *                   street:
 *                     type: string
 *                     description: Street name of the address
 *                   house:
 *                     type: string
 *                     description: House number of the address
 *                   apartment:
 *                     type: string
 *                     description: Apartment number of the address
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
crmAddressRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await CrmAddressController.getCrmAddress();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /crm_address/{id}:
 *   get:
 *     tags:
 *       - Crm Address
 *     summary: Get a specific CRM address by ID
 *     description: Endpoint to retrieve a specific CRM address based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the CRM address to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: The CRM address corresponding to the given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the CRM address
 *                 country:
 *                   type: string
 *                   description: Country of the address
 *                 city:
 *                   type: string
 *                   description: City of the address
 *                 street:
 *                   type: string
 *                   description: Street name of the address
 *                 house:
 *                   type: string
 *                   description: House number of the address
 *                 apartment:
 *                   type: string
 *                   description: Apartment number of the address
 *                 crm_crard_id:
 *                   type: integer
 *                   description: ID of the associated CRM card
 *       404:
 *         description: CRM address not found with the provided ID
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
crmAddressRouter.get('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const record = await CrmAddressController.getCrmAddressById(Number(id));
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
 * /crm_address/{id}:
 *   delete:
 *     tags:
 *       - Crm Address
 *     summary: Delete a specific CRM address by ID
 *     description: Endpoint to delete a specific CRM address based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the CRM address to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: The CRM address was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card deleted successfully"
 *       404:
 *         description: CRM address not found with the provided ID
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
crmAddressRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await CrmAddressController.deleteCrmAddress(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});