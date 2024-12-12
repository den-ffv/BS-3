import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as BookController from '../controller/book.controller';

export const bookRouter = express.Router();

/**
 * @swagger
 * /book:
 *   post:
 *     tags:
 *       - Book
 *     summary: Create a new book
 *     description: Endpoint to create a new book record in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the book
 *                 example: "The Great Gatsby"
 *               description:
 *                 type: string
 *                 description: Description or summary of the book
 *                 example: "A novel about the American dream."
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the book
 *                 example: 19.99
 *               published_at:
 *                 type: string
 *                 format: date-time
 *                 description: Publication date of the book
 *                 example: "2024-11-18T00:00:00Z"
 *               stock:
 *                 type: integer
 *                 description: Number of copies available
 *                 example: 100
 *               author_id:
 *                 type: integer
 *                 description: ID of the author of the book
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 description: ID of the category the book belongs to
 *                 example: 2
 *               publisher_id:
 *                 type: integer
 *                 description: ID of the publisher of the book
 *                 example: 3
 *             required:
 *               - title
 *               - description
 *               - price
 *               - published_at
 *               - stock
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the created book
 *                 title:
 *                   type: string
 *                   description: Title of the book
 *                 description:
 *                   type: string
 *                   description: Description of the book
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the book
 *                 published_at:
 *                   type: string
 *                   format: date-time
 *                   description: Publication date of the book
 *                 stock:
 *                   type: integer
 *                   description: Number of copies available
 *                 author_id:
 *                   type: integer
 *                   description: ID of the author of the book
 *                 category_id:
 *                   type: integer
 *                   description: ID of the category the book belongs to
 *                 publisher_id:
 *                   type: integer
 *                   description: ID of the publisher of the book
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
bookRouter.post('/',
  body('title').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('price').notEmpty().isFloat(),
  body('published_at').notEmpty().isISO8601().toDate(),
  body('stock').notEmpty().isInt(),
  body('author_id').if(body('author_id').notEmpty()).isInt(),
  body('category_id').if(body('category_id').notEmpty()).isInt(),
  body('publisher_id').if(body('publisher_id').notEmpty()).isInt(),
  async (request: Request, response: Response): Promise<any> => {
    console.log('SIGNUP', request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const data = request.body;
      const record = await BookController.createBook(data);
      return response.status(201).json(record);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /book/{id}:
 *   put:
 *     tags:
 *       - Book
 *     summary: Update an existing book
 *     description: Endpoint to update an existing book record in the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the book
 *                 example: "The Great Gatsby"
 *               description:
 *                 type: string
 *                 description: Description or summary of the book
 *                 example: "A revised edition of the classic novel."
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the book
 *                 example: 24.99
 *               published_at:
 *                 type: string
 *                 format: date-time
 *                 description: Publication date of the book
 *                 example: "2025-01-01T00:00:00Z"
 *               stock:
 *                 type: integer
 *                 description: Number of copies available
 *                 example: 50
 *               author_id:
 *                 type: integer
 *                 description: ID of the author of the book
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 description: ID of the category the book belongs to
 *                 example: 2
 *               publisher_id:
 *                 type: integer
 *                 description: ID of the publisher of the book
 *                 example: 3
 *             required:
 *               - title
 *               - description
 *               - price
 *               - published_at
 *               - stock
 *     responses:
 *       200:
 *         description: The book was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the updated book
 *                 title:
 *                   type: string
 *                   description: Title of the book
 *                 description:
 *                   type: string
 *                   description: Description of the book
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the book
 *                 published_at:
 *                   type: string
 *                   format: date-time
 *                   description: Publication date of the book
 *                 stock:
 *                   type: integer
 *                   description: Number of copies available
 *                 author_id:
 *                   type: integer
 *                   description: ID of the author of the book
 *                 category_id:
 *                   type: integer
 *                   description: ID of the category the book belongs to
 *                 publisher_id:
 *                   type: integer
 *                   description: ID of the publisher of the book
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
 *         description: Book not found
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
bookRouter.put('/:id',
    body('title').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('price').notEmpty().isFloat(),
    body('published_at').notEmpty().isISO8601().toDate(),
    body('stock').notEmpty().isInt(),
    body('author_id').if(body('author_id').notEmpty()).isInt(),
    body('category_id').if(body('category_id').notEmpty()).isInt(),
    body('publisher_id').if(body('publisher_id').notEmpty()).isInt(),
    async (request: Request, response: Response): Promise<any> => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = request.params;
        const data = request.body;
        const updatedRecord = await BookController.updateBook(Number(id), data);
  
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
 * /book:
 *   get:
 *     tags:
 *       - Book
 *     summary: Retrieve all books
 *     description: Endpoint to fetch a list of all books in the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID of the book
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: Title of the book
 *                     example: "The Great Gatsby"
 *                   description:
 *                     type: string
 *                     description: Description or summary of the book
 *                     example: "A novel about the American dream."
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: Price of the book
 *                     example: 19.99
 *                   published_at:
 *                     type: string
 *                     format: date-time
 *                     description: Publication date of the book
 *                     example: "2024-11-18T00:00:00Z"
 *                   stock:
 *                     type: integer
 *                     description: Number of copies available
 *                     example: 100
 *                   author_id:
 *                     type: integer
 *                     description: ID of the author of the book
 *                     example: 1
 *                   category_id:
 *                     type: integer
 *                     description: ID of the category the book belongs to
 *                     example: 2
 *                   publisher_id:
 *                     type: integer
 *                     description: ID of the publisher of the book
 *                     example: 3
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
bookRouter.get('/', async (request: Request, response: Response): Promise<any> => {
  try {
    const records = await BookController.getBook();
    return response.status(200).json(records);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /book/get/{id}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Retrieve a book by ID
 *     description: Endpoint to fetch a specific book by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the book
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: Title of the book
 *                   example: "The Great Gatsby"
 *                 description:
 *                   type: string
 *                   description: Description or summary of the book
 *                   example: "A novel about the American dream."
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the book
 *                   example: 19.99
 *                 published_at:
 *                   type: string
 *                   format: date-time
 *                   description: Publication date of the book
 *                   example: "2024-11-18T00:00:00Z"
 *                 stock:
 *                   type: integer
 *                   description: Number of copies available
 *                   example: 100
 *                 author_id:
 *                   type: integer
 *                   description: ID of the author of the book
 *                   example: 1
 *                 category_id:
 *                   type: integer
 *                   description: ID of the category the book belongs to
 *                   example: 2
 *                 publisher_id:
 *                   type: integer
 *                   description: ID of the publisher of the book
 *                   example: 3
 *       404:
 *         description: Book not found
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
bookRouter.get('/get/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    console.log(123);
    const { id } = request.params;
    const record = await BookController.getBookById(Number(id));
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
 * /book/{id}:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Delete a book by ID
 *     description: Endpoint to delete a specific book by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the book to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CRM card deleted successfully"
 *       404:
 *         description: Book not found
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
bookRouter.delete('/:id', async (request: Request, response: Response): Promise<any> => {
  try {
    const { id } = request.params;
    const deletedRecord = await BookController.deleteBook(Number(id));

    if (!deletedRecord) {
      return response.status(404).json({ message: 'CRM card not found' });
    }

    return response.status(200).json({ message: 'CRM card deleted successfully' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /book/filters:
 *   get:
 *     tags:
 *       - Book
 *     summary: Retrieve a book by filters
 *     description: Endpoint to fetch a specific book by its unique ID.
 *     parameters:
 *     - in: query
 *       name: author_id
 *       schema:
 *         type: integer
 *       description: Filter books by author ID
 *     - in: query
 *       name: category_id
 *       schema:
 *         type: integer
 *       description: Filter books by category ID
 *     - in: query
 *       name: publisher_id
 *       schema:
 *         type: integer
 *       description: Filter books by publisher ID
 *     - in: query
 *       name: min_price
 *       schema:
 *         type: number
 *         format: float
 *       description: Minimum price of the book
 *     - in: query
 *       name: max_price
 *       schema:
 *         type: number
 *         format: float
 *       description: Maximum price of the book
 *     responses:
 *       200:
 *         description: Successfully retrieved the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the book
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: Title of the book
 *                   example: "The Great Gatsby"
 *                 description:
 *                   type: string
 *                   description: Description or summary of the book
 *                   example: "A novel about the American dream."
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the book
 *                   example: 19.99
 *                 published_at:
 *                   type: string
 *                   format: date-time
 *                   description: Publication date of the book
 *                   example: "2024-11-18T00:00:00Z"
 *                 stock:
 *                   type: integer
 *                   description: Number of copies available
 *                   example: 100
 *                 author_id:
 *                   type: integer
 *                   description: ID of the author of the book
 *                   example: 1
 *                 category_id:
 *                   type: integer
 *                   description: ID of the category the book belongs to
 *                   example: 2
 *                 publisher_id:
 *                   type: integer
 *                   description: ID of the publisher of the book
 *                   example: 3
 *       404:
 *         description: Book not found
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
bookRouter.get('/filters', async (request: Request, response: Response): Promise<any> => {

  try {    
      const filters = {
          author_id: request.query.author_id ? Number(request.query.author_id) : undefined,
          category_id: request.query.category_id ? Number(request.query.category_id) : undefined,
          publisher_id: request.query.publisher_id ? Number(request.query.publisher_id) : undefined,
          min_price: request.query.min_price ? Number(request.query.min_price) : undefined,
          max_price: request.query.max_price ? Number(request.query.max_price) : undefined,
      };

      const records = await BookController.getBookByFilter(filters);
      return response.status(200).json(records);
  } catch (error: any) {
      return response.status(500).json({ message: error.message });
  }
});
