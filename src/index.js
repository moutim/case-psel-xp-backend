/* eslint-disable no-console */
const express = require('express');

require('express-async-errors');

const app = express();

const middlewares = require('./middlewares');

app.use(express.json());

app.use(require('./routes'));

app.get('/', (req, res) => res.send('<h1> FUNCIONANDO </h1>'));

app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
