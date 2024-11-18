import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as OrderController from '../controller/order.controller';

export const orderRouter = express.Router();

/**
 * @swagger
 * /order:
 *   post:
 *     tags:
 *       - Order
 *     summary: Create a new order
 *     description: Endpoint to create a new order in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total_amount:
 *                 type: number
 *                 format: float
 *                 description: Total amount of the order
 *                 example: 100.5
 *               order_status_id:
 *                 type: integer
 *                 description: ID of the associated order status
 *                 example: 1
 *               order_date:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the order was placed
 *                 example: "2024-11-18T10:30:00Z"
 *               user_id:
 *                 type: integer
 *                 description: ID of the user who placed the order
 *                 example: 123
 *             required:
 *               - total_amount
 *               - order_status_id
 *               - order_date
 *               - user_id
 *     responses:
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the created order
 *                   example: 1
 *                 total_amount:
 *                   type: number
 *                   format: float
 *                   description: Total amount of the order
 *                   example: 100.5
 *                 order_status_id:
 *                   type: integer
 *                   description: ID of the associated order status
 *                   example: 1
 *                 order_date:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the order was placed
 *                   example: "2024-11-18T10:30:00Z"
 *                 user_id:
 *                   type: integer
 *                   description: ID of the user who placed the order
 *                   example: 123
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
orderRouter.post('/',
  body('total_amount').notEmpty().isFloat(),
  body('order_status_id').notEmpty().isInt(),
  body('order_date').notEmpty().isISO8601().toDate(),
  body('user_id').notEmpty().isInt(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await OrderController.createOrder(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     tags:
 *       - Order
 *     summary: Update an existing order
 *     description: Endpoint to update an order in the system by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total_amount:
 *                 type: number
 *                 format: float
 *                 description: Total amount of the order
 *                 example: 120.5
 *               order_status_id:
 *                 type: integer
 *                 description: ID of the associated order status
 *                 example: 2
 *               order_date:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the order was placed
 *                 example: "2024-11-19T10:30:00Z"
 *               user_id:
 *                 type: integer
 *                 description: ID of the user who placed the order
 *                 example: 123
 *             required:
 *               - total_amount
 *               - order_status_id
 *               - order_date
 *               - user_id
 *     responses:
 *       200:
 *         description: The order was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the updated order
 *                   example: 1
 *                 total_amount:
 *                   type: number
 *                   format: float
 *                   description: Total amount of the order
 *                   example: 120.5
 *                 order_status_id:
 *                   type: integer
 *                   description: ID of the associated order status
 *                   example: 2
 *                 order_date:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the order was placed
 *                   example: "2024-11-19T10:30:00Z"
 *                 user_id:
 *                   type: integer
 *                   description: ID of the user who placed the order
 *                   example: 123
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
 *         description: Order not found
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
orderRouter.put('/:id',
    body('total_amount').notEmpty().isFloat(),
    body('order_status_id').notEmpty().isInt(),
    body('order_date').notEmpty().isISO8601().toDate(),
    body('user_id').notEmpty().isInt(),
    async (request: Request, response: Response): Promise<any> => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = request.params;
        const data = request.body;
        const updatedRecord = await OrderController.updateOrder(Number(id), data);
  
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
 * /order:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get all orders
 *     description: Endpoint to retrieve a list of all orders in the system.
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID of the order
 *                     example: 1
 *                   total_amount:
 *                     type: number
 *                     format: float
 *                     description: Total amount of the order
 *                     example: 100.5
 *                   order_status_id:
 *                     type: integer
 *                     description: ID of the associated order status
 *                     example: 1
 *                   order_date:
 *                     type: string
 *                     format: date-time
 *                     description: The date when the order was placed
 *                     example: "2024-11-18T10:30:00Z"
 *                   user_id:
 *                     type: integer
 *                     description: ID of the user who placed the order
 *                     example: 123
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
orderRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await OrderController.getOrder();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get order by ID
 *     description: Endpoint to retrieve a specific order by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the order
 *                   example: 1
 *                 total_amount:
 *                   type: number
 *                   format: float
 *                   description: Total amount of the order
 *                   example: 100.5
 *                 order_status_id:
 *                   type: integer
 *                   description: ID of the associated order status
 *                   example: 1
 *                 order_date:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the order was placed
 *                   example: "2024-11-18T10:30:00Z"
 *                 user_id:
 *                   type: integer
 *                   description: ID of the user who placed the order
 *                   example: 123
 *       404:
 *         description: Order not found
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
orderRouter.get('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const record = await OrderController.getOrderById(Number(id));
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
 * /order/{id}:
 *   delete:
 *     tags:
 *       - Order
 *     summary: Delete order by ID
 *     description: Endpoint to delete a specific order by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card deleted successfully"
 *       404:
 *         description: Order not found
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
orderRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await OrderController.deleteOrder(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});