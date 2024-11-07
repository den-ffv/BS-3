import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'The Literary Loft',
      version: '1.0.0',
      description: 'API Documentation for a bookstore',
    },
    servers: [
      {
        url: 'http://localhost:5555/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
