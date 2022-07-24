const express = require('express');

const routes = express.Router();

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerUI = require('swagger-ui-express');

const middlewares = require('../middlewares');

const swaggerJSONDoc = swaggerJSDoc(require('../docs/swagger.config'));

routes.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerJSONDoc));

routes.use('/login', require('./login.routes'));

routes.use('/register', require('./register.routes'));

routes.use('/customer', middlewares.authenticateToken, require('./customer.routes'));

routes.use('/stocks', middlewares.authenticateToken, require('./stock.routes'));

/**
 * @swagger
 *  tags:
 *  - name: Login
 *    description: Consiga um token de autorização
 *  - name: Register
 *    description: Crie uma conta e consiga um token de autorização
 *  - name: Customer
 *    description: Listar e atualizar informações sobre a conta do cliente
 *  - name: Stocks
 *    description: Informações, compra e venda de ações
 */

/**
 * @swagger
 *  components:
    *  schemas:
    *    Login:
    *      type: object
    *      required:
    *      - email
    *      - password
    *      properties:
    *        email:
    *          type: string
    *          example: login@example.com
    *        password:
    *          type: string
    *          example: 12345
    *    Register:
    *      type: object
    *      required:
    *      - firstName
    *      - lastName
    *      - email
    *      - password
    *      properties:
    *        firstName:
    *          type: string
    *          example: Novo
    *        lastName:
    *          type: string
    *          example: Usuario
    *        email:
    *          type: string
    *          example: psel@example.com
    *        password:
    *          type: string
    *          example: 12345
    *    Message:
    *      type: object
    *      properties:
    *        message:
    *          type: string
    *    Token:
    *      type: object
    *      properties:
    *        token:
    *          type: string
    *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6Ik
    *            pXVCJ9.eyJjdXN0b21lcklkIjo0LCJpYXQiOjE2NTg
    *            1Mjg0MzMsImV4cCI6MTY1ODU1NzIzM30.LMWS
    *            gdxUsu3Pyej0k6pDkBCrccI3NbdvuCXCiD7BgGQ
    *    Withdraw or Deposit:
    *      required:
    *      - value
    *      type: object
    *      properties:
    *        value:
    *          type: number
    *    Customer Infos:
    *      type: object
    *      properties:
    *        customerId:
    *          type: number
    *          example: 1
    *        firstName:
    *          type: string
    *          example: Usuario
    *        lastName:
    *          type: string
    *          example: Da Silva
    *        email:
    *          type: string
    *          example: psel@example.com
    *        balance:
    *          type: number
    *          example: 777.77
    *    Customer Transactions:
    *      type: array
    *      items:
    *        type: object
    *        properties:
    *          transactionId:
    *            type: number
    *            example: 10
    *          customerId:
    *            type: number
    *            example: 1
    *          value:
    *            type: number
    *            example: 100
    *          date:
    *            type: string
    *            example: 2022-07-22T22:20:33.000Z
    *          type:
    *            type: object
    *            properties:
    *              type:
    *                type: string
    *                example: withdraw
    *    Customer Stocks Wallet:
  *        type: object
  *        properties:
  *          customerId:
  *            type: number
  *            example: 1
  *          stockId:
  *            type: number
  *            example: 1
  *          name:
  *            type: string
  *            example: PETR4
  *          quantity:
  *            type: number
  *            example: 20
  *          companyName:
  *            type: string
  *            example: BR Petrobras
  *          date:
  *            type: string
  *            example: 2022-07-22T22:20:33.000Z
  *          amount:
  *            type: number
  *            example: 777.77
    *    Customer Stocks Transactions:
  *        type: object
  *        properties:
  *          customerId:
  *            type: number
  *            example: 1
  *          transactionId:
  *            type: number
  *            example: 10
  *          stockId:
  *            type: number
  *            example: 1
  *          name:
  *            type: string
  *            example: PETR4
  *          quantity:
  *            type: number
  *            example: 20
  *          value:
  *            type: number
  *            example: 540.29
  *          companyName:
  *            type: string
  *            example: BR Petrobras
  *          type:
  *            type: string
  *            example: buy
  *          date:
  *            type: string
  *            example: 2022-07-22T22:20:33.000Z
    *    Transactions:
  *        type: object
  *        properties:
  *          message:
  *            type: string
  *          transactionId:
  *            type: number
  *            example: 10
  *          customerId:
  *            type: number
  *            example: 1
  *          value:
  *            type: number
  *            example: 100
    *    Update Customer:
    *      type: object
    *      properties:
    *        firstName:
    *          type: string
    *          example: Novo
    *        lastName:
    *          type: string
    *          example: Nome
    *        email:
    *          type: string
    *          example: psel@example.com
    *        password:
    *          type: string
    *          example: 12345
    *    Stocks:
    *      type: object
    *      properties:
    *        stockId:
    *          type: number
    *          example: 1
    *        name:
    *          type: string
    *          example: PETR4
    *        value:
    *          type: number
    *          example: 74.23
    *        quantity:
    *          type: number
    *          example: 20
    *        companyName:
    *          type: string
    *          example: BR Petrobras
    *        percentageVariation:
    *          type: string
    *          example: 2.17
    *        high:
    *          type: number
    *          example: 119.20
    *        low:
    *          type: number
    *          example: 12.20
    *        oldPrice:
    *          type: number
    *          example: 72.19
    *        typeVariation:
    *          type: string
    *          example: up
    *        totalInvested:
    *          type: number
    *          example: 777.77
    *    Buy or Sell Stocks:
    *      type: object
    *      required:
    *        - stockId
    *        - quantity
    *      properties:
    *        stockId:
    *          type: number
    *        quantity:
    *          type: number
    *    Transaction Performed:
    *      type: object
    *      properties:
    *        message:
    *          type: string
    *        transactionId:
    *          type: number
    *          example: 10
    *        customerId:
    *          type: number
    *          example: 1
    *        stockId:
    *          type: number
    *          example: 1
    *        quantity:
    *          type: number
    *          example: 10
 */

/**
 * @swagger
 *   /login:
 *     post:
 *       tags: [Login]
 *       description: Ao adicionar email e password no body da requisição,
 *         os dados são comparados com os do banco de dados, e se eles forem iguais, é
 *         retornado um token JWT de autorização.
 *       consumes:
 *        - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Login'
 *       responses:
 *         200:
 *           description: Token gerado com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Token'
 *         401:
 *           description: A senha está incorreta
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 *         404:
 *           description: Email não encontrado no banco
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 *         422:
 *           description: Email ou password está no formato incorreto
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *   /register:
 *     post:
 *       tags: [Register]
 *       description: Adicione firstName, lastName, email e
 *         password no body para criar uma conta nova e conseguir um token de autorização.
 *       consumes:
 *        - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Register'
 *       responses:
 *         201:
 *           description: Conta criada com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Token'
 *         400:
 *           description: Email já cadastrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 *         422:
 *           description: Algum dado passado no body está no formato errado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *   /customer/infos:
 *     get:
 *       tags: [Customer]
 *       summary: Informações gerais da conta
 *       description: Retornas as informações gerais do cliente,
 *         como ID, nome, sobrenome, email e saldo.
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       responses:
 *         200:
 *           description: Retorna um objeto com as informações do cliente
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Customer Infos'
 *         404:
 *           description: Cliente não encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */
/**
 * @swagger
 *   /customer/transactions:
 *     get:
 *       tags: [Customer]
 *       summary: Informação sobre as transações de saque e deposito do cliente
 *       description: Retorna um array de objetos com as informações das transações.
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       responses:
 *         200:
 *           description: Array de objetos com as informações das transações.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Customer Transactions'
 *         404:
 *           description: Não existe transações relacionadas a esse cliente
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *   /customer/stocks:
 *     get:
 *       tags: [Customer]
 *       summary: Informações sobre a carteira e as transações de ações do cliente
 *       description: Retorna um objeto com stocksWallet,
 *         onde está todas as ações que o cliente possui e stocksTransactions
 *         com todas as transações envolvendo ações
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       responses:
 *         200:
 *           description: Objeto com stocksWallet e stocksTransactions
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   stocksWallet:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Customer Stocks Wallet'
 *                   stocksTransactions:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Customer Stocks Transactions'
 */

/**
 * @swagger
 *   /customer/withdraw:
 *     post:
 *       tags: [Customer]
 *       summary: Realiza uma retirada no valor total de saldo do cliente
 *       description: Informe um valor entre 50 e 10000 a ser retirado pela chave "value" no body
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Withdraw or Deposit'
 *       responses:
 *         200:
 *           description: Retorna um objeto com as informações da transação
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Transactions'
 *         401:
 *           description: Saldo insuficiente para realizar a transação
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 *         422:
 *           description: O valor está com formato errado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *   /customer/deposit:
 *     post:
 *       tags: [Customer]
 *       summary: Realiza um deposito no saldo total do cliente
 *       description: Informe um valor entre 50 e
 *         10000 na chave "value" do body para realizar o deposito
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Withdraw or Deposit'
 *       responses:
 *         200:
 *           description: Retorna um objeto com as informações da transação
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Transactions'
 *         422:
 *           description: O valor está com formato errado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *   /customer/update:
 *     put:
 *       tags: [Customer]
 *       summary: Atualiza informações da conta do cliente
 *       description: Informe os campos que devem ser modificados pelo body
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Update Customer'
 *       responses:
 *         200:
 *           description: Retorna uma mensagem confirmando que as informações foram atualizadas
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 *         422:
 *           description: Algum valor passado no body está com formato errado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *   /customer/delete:
 *     delete:
 *       tags: [Customer]
 *       summary: Deleta um cliente
 *       description: O cliente é deletado a partir de um token de autorização
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       responses:
 *         200:
 *           description: Retorna uma mensagem confirmando que a conta do cliente foi deletada
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *   /stocks:
 *     get:
 *       tags: [Stocks]
 *       summary: Lista as ações disponíveis para compra
 *       description: O array de objetos retornado lista todas as informações sobre as ações que
 *         possuem pelo menos uma unidade para ser vendida
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       responses:
 *         200:
 *           description: Retorna um array de objetos com as informações
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Stocks'
 *         404:
 *           description: Não existe ações disponíveis para compra
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *   /stocks/{stockId}:
 *     get:
 *       tags: [Stocks]
 *       summary: Busca as informações de uma ação pelo ID
 *       description:  O array com o objeto retornado lista todas as informações sobre a ação.
 *         possuem pelo menos uma unidade para ser vendida
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       parameters:
 *       - name: stockId
 *         in: path
 *         description: ID da ação
 *         required: true
 *         type: number
 *       responses:
 *         200:
 *           description: Retorna um array com o objeto que contem as informações
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Stocks'
 *         404:
 *           description: Não existe ação com esse ID informado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *   /stocks/buy:
 *     post:
 *       tags: [Stocks]
 *       summary: Compre ações
 *       description:  Adicione o ID da ação e a quantidade de
 *         ações a ser comprada no body da requisição
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Buy or Sell Stocks'
 *       responses:
 *         200:
 *           description: Retorna um objeto com o as informações da compra
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Transaction Performed'
 *         401:
 *           description: Saldo insuficiente ou não existe mais ações disponíveis para compra
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 *   /stocks/sell:
 *     post:
 *       tags: [Stocks]
 *       summary: Venda ações
 *       description:  Adicione o ID da ação e a quantidade de
 *         ações a ser vendidas no body da requisição
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *        - application/json
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Buy or Sell Stocks'
 *       responses:
 *         200:
 *           description: Retorna um objeto com o as informações da venda
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Transaction Performed'
 */

module.exports = routes;
