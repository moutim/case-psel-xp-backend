const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Case Back-End PSEL XP Inc.',
      description: 'Essa API simula o funcionamento de uma aplicação para compra e venda de ações com valor varíavel.',
      version: '1.0',
    },
    servers: [
      { url: 'https://api-case.onrender.com', description: 'Ambiente de produção' },
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
