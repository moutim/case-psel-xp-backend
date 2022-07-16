/* eslint-disable no-console */
const express = require('express');

const app = express();

app.use(express.json());

app.use(require('./routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
