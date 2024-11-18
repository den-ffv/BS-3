import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as OrderItemController from '../controller/orderItem.controller';

export const orderItemRouter = express.Router();

/**
 * @swagger
 * /order_item:
 *   post:
 *     tags:
 *       - OrderItem
 *     summary: Create a new order item
 *     description: Endpoint to create a new order item in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the ordered item
 *                 example: 2
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the ordered item
 *                 example: 15.5
 *               orderId:
 *                 type: integer
 *                 description: The ID of the associated order
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 description: The ID of the book being ordered
 *                 example: 5
 *             required:
 *               - quantity
 *               - price
 *               - orderId
 *               - bookId
 *     responses:
 *       201:
 *         description: The order item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the created order item
 *                   example: 1
 *                 quantity:
 *                   type: integer
 *                   description: Quantity of the ordered item
 *                   example: 2
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the ordered item
 *                   example: 15.5
 *                 orderId:
 *                   type: integer
 *                   description: ID of the associated order
 *                   example: 1
 *                 bookId:
 *                   type: integer
 *                   description: ID of the book being ordered
 *                   example: 5
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
orderItemRouter.post('/',
  body('quantity').notEmpty().isInt(),
  body('price').notEmpty().isFloat(),
  body('orderId').notEmpty().isInt(),
  body('bookId').notEmpty().isInt(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await OrderItemController.createOrderItem(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /order_item/{id}:
 *   put:
 *     tags:
 *       - OrderItem
 *     summary: Update order item by ID
 *     description: Endpoint to update an existing order item by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the order item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the ordered item
 *                 example: 3
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the ordered item
 *                 example: 20.5
 *               orderId:
 *                 type: integer
 *                 description: The ID of the associated order
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 description: The ID of the book being ordered
 *                 example: 5
 *             required:
 *               - quantity
 *               - price
 *               - orderId
 *               - bookId
 *     responses:
 *       200:
 *         description: The order item was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the updated order item
 *                   example: 1
 *                 quantity:
 *                   type: integer
 *                   description: Quantity of the ordered item
 *                   example: 3
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the ordered item
 *                   example: 20.5
 *                 orderId:
 *                   type: integer
 *                   description: ID of the associated order
 *                   example: 1
 *                 bookId:
 *                   type: integer
 *                   description: ID of the book being ordered
 *                   example: 5
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
 *         description: Order item not found
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
orderItemRouter.put('/:id',
    body('quantity').notEmpty().isInt(),
    body('price').notEmpty().isFloat(),
    body('orderId').notEmpty().isInt(),
    body('bookId').notEmpty().isInt(),
    async (request: Request, response: Response): Promise<any> => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = request.params;
        const data = request.body;
        const updatedRecord = await OrderItemController.updateOrderItem(Number(id), data);
  
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
 * /order_item:
 *   get:
 *     tags:
 *       - OrderItem
 *     summary: Get all order items
 *     description: Endpoint to retrieve a list of all order items.
 *     responses:
 *       200:
 *         description: A list of all order items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID of the order item
 *                     example: 1
 *                   quantity:
 *                     type: integer
 *                     description: Quantity of the ordered item
 *                     example: 3
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: Price of the ordered item
 *                     example: 20.5
 *                   orderId:
 *                     type: integer
 *                     description: ID of the associated order
 *                     example: 1
 *                   bookId:
 *                     type: integer
 *                     description: ID of the book being ordered
 *                     example: 5
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
orderItemRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await OrderItemController.getOrderItem();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /order_item/{id}:
 *   get:
 *     tags:
 *       - OrderItem
 *     summary: Get a specific order item by ID
 *     description: Endpoint to retrieve a specific order item by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order item to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: The order item was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the order item
 *                   example: 1
 *                 quantity:
 *                   type: integer
 *                   description: Quantity of the ordered item
 *                   example: 3
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the ordered item
 *                   example: 20.5
 *                 orderId:
 *                   type: integer
 *                   description: ID of the associated order
 *                   example: 1
 *                 bookId:
 *                   type: integer
 *                   description: ID of the book being ordered
 *                   example: 5
 *       404:
 *         description: Order item not found
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
orderItemRouter.get('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const record = await OrderItemController.getOrderItemById(Number(id));
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
 * /order_item/{id}:
 *   delete:
 *     tags:
 *       - OrderItem
 *     summary: Delete a specific order item by ID
 *     description: Endpoint to delete a specific order item by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order item to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: The order item was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card deleted successfully"
 *       404:
 *         description: Order item not found
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
orderItemRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await OrderItemController.deleteOrderItem(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});