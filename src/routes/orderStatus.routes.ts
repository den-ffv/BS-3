import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as OrderStatusController from '../controller/orderStatus.controller';

export const orderStatusRouter = express.Router();

/**
 * @swagger
 * /order_status:
 *   post:
 *     tags:
 *       - OrderStatus
 *     summary: Create a new order status
 *     description: Endpoint to create a new order status record in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the order status
 *                 example: "Pending"
 *               is_done:
 *                 type: boolean
 *                 description: Whether the order is marked as done
 *                 example: false
 *               is_awaiting_payment:
 *                 type: boolean
 *                 description: Whether the order is awaiting payment
 *                 example: true
 *               is_paid:
 *                 type: boolean
 *                 description: Whether the order is paid
 *                 example: false
 *               is_confirmed:
 *                 type: boolean
 *                 description: Whether the order is confirmed
 *                 example: false
 *               is_performed:
 *                 type: boolean
 *                 description: Whether the order is performed
 *                 example: false
 *               is_canceled:
 *                 type: boolean
 *                 description: Whether the order is canceled
 *                 example: false
 *             required:
 *               - title
 *               - is_done
 *               - is_awaiting_payment
 *               - is_paid
 *               - is_confirmed
 *               - is_performed
 *               - is_canceled
 *     responses:
 *       201:
 *         description: The order status was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the created order status
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: Title of the order status
 *                 is_done:
 *                   type: boolean
 *                   description: Whether the order is marked as done
 *                 is_awaiting_payment:
 *                   type: boolean
 *                   description: Whether the order is awaiting payment
 *                 is_paid:
 *                   type: boolean
 *                   description: Whether the order is paid
 *                 is_confirmed:
 *                   type: boolean
 *                   description: Whether the order is confirmed
 *                 is_performed:
 *                   type: boolean
 *                   description: Whether the order is performed
 *                 is_canceled:
 *                   type: boolean
 *                   description: Whether the order is canceled
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
orderStatusRouter.post('/',
  body('title').notEmpty().isString(),
  body('is_done').notEmpty().isBoolean(),
  body('is_awaiting_payment').notEmpty().isBoolean(),
  body('is_paid').notEmpty().isBoolean(),
  body('is_confirmed').notEmpty().isBoolean(),
  body('is_performed').notEmpty().isBoolean(),
  body('is_canceled').notEmpty().isBoolean(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await OrderStatusController.createOrderStatus(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /order_status/{id}:
 *   put:
 *     tags:
 *       - OrderStatus
 *     summary: Update an existing order status by ID
 *     description: Endpoint to update the details of an existing order status by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the order status to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the order status
 *                 example: "Shipped"
 *               is_done:
 *                 type: boolean
 *                 description: Whether the order is marked as done
 *                 example: true
 *               is_awaiting_payment:
 *                 type: boolean
 *                 description: Whether the order is awaiting payment
 *                 example: false
 *               is_paid:
 *                 type: boolean
 *                 description: Whether the order is paid
 *                 example: true
 *               is_confirmed:
 *                 type: boolean
 *                 description: Whether the order is confirmed
 *                 example: true
 *               is_performed:
 *                 type: boolean
 *                 description: Whether the order is performed
 *                 example: false
 *               is_canceled:
 *                 type: boolean
 *                 description: Whether the order is canceled
 *                 example: false
 *             required:
 *               - title
 *               - is_done
 *               - is_awaiting_payment
 *               - is_paid
 *               - is_confirmed
 *               - is_performed
 *               - is_canceled
 *     responses:
 *       200:
 *         description: The order status was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the updated order status
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: Title of the order status
 *                 is_done:
 *                   type: boolean
 *                   description: Whether the order is marked as done
 *                 is_awaiting_payment:
 *                   type: boolean
 *                   description: Whether the order is awaiting payment
 *                 is_paid:
 *                   type: boolean
 *                   description: Whether the order is paid
 *                 is_confirmed:
 *                   type: boolean
 *                   description: Whether the order is confirmed
 *                 is_performed:
 *                   type: boolean
 *                   description: Whether the order is performed
 *                 is_canceled:
 *                   type: boolean
 *                   description: Whether the order is canceled
 *       404:
 *         description: Order status not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card not found"
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

orderStatusRouter.put('/:id',
    body('title').notEmpty().isString(),
    body('is_done').notEmpty().isBoolean(),
    body('is_awaiting_payment').notEmpty().isBoolean(),
    body('is_paid').notEmpty().isBoolean(),
    body('is_confirmed').notEmpty().isBoolean(),
    body('is_performed').notEmpty().isBoolean(),
    body('is_canceled').notEmpty().isBoolean(),
    async (request: Request, response: Response): Promise<any> => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = request.params;
        const data = request.body;
        const updatedRecord = await OrderStatusController.updateOrderStatus(Number(id), data);
  
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
 * /order_status:
 *   get:
 *     tags:
 *       - OrderStatus
 *     summary: Get all order statuses
 *     description: Endpoint to retrieve a list of all order statuses.
 *     responses:
 *       200:
 *         description: A list of all order statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID of the order status
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: Title of the order status
 *                     example: "Pending"
 *                   is_done:
 *                     type: boolean
 *                     description: Whether the order is marked as done
 *                     example: false
 *                   is_awaiting_payment:
 *                     type: boolean
 *                     description: Whether the order is awaiting payment
 *                     example: true
 *                   is_paid:
 *                     type: boolean
 *                     description: Whether the order is paid
 *                     example: false
 *                   is_confirmed:
 *                     type: boolean
 *                     description: Whether the order is confirmed
 *                     example: false
 *                   is_performed:
 *                     type: boolean
 *                     description: Whether the order is performed
 *                     example: false
 *                   is_canceled:
 *                     type: boolean
 *                     description: Whether the order is canceled
 *                     example: false
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
orderStatusRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await OrderStatusController.getOrderStatus();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /order_status/{id}:
 *   get:
 *     tags:
 *       - OrderStatus
 *     summary: Get an order status by ID
 *     description: Endpoint to retrieve a specific order status by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the order status to retrieve
 *     responses:
 *       200:
 *         description: The order status was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the order status
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: Title of the order status
 *                   example: "Shipped"
 *                 is_done:
 *                   type: boolean
 *                   description: Whether the order is marked as done
 *                   example: true
 *                 is_awaiting_payment:
 *                   type: boolean
 *                   description: Whether the order is awaiting payment
 *                   example: false
 *                 is_paid:
 *                   type: boolean
 *                   description: Whether the order is paid
 *                   example: true
 *                 is_confirmed:
 *                   type: boolean
 *                   description: Whether the order is confirmed
 *                   example: true
 *                 is_performed:
 *                   type: boolean
 *                   description: Whether the order is performed
 *                   example: false
 *                 is_canceled:
 *                   type: boolean
 *                   description: Whether the order is canceled
 *                   example: false
 *       404:
 *         description: Order status not found
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
orderStatusRouter.get('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const record = await OrderStatusController.getOrderStatusById(Number(id));
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
 * /order_status/{id}:
 *   delete:
 *     tags:
 *       - OrderStatus
 *     summary: Delete an order status by ID
 *     description: Endpoint to delete a specific order status by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the order status to delete
 *     responses:
 *       200:
 *         description: The order status was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card deleted successfully"
 *       404:
 *         description: Order status not found
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
orderStatusRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await OrderStatusController.deleteOrderStatus(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});