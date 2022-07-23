const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'My API Documentation',
      description: 'This is a sample OpenAPI document',
      version: '1.0',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Ambiente de desenvolvimento' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/index.js'],
};

module.exports = swaggerConfig;
