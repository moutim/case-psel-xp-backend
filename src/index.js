/* eslint-disable no-console */
const express = require('express');

const app = express();

const middlewares = require('./middlewares');

app.use(express.json());

app.use(require('./routes'));

app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
