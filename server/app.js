require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./db/mongoose');

const app = new express();
const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});

// load middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.send('Task Manager!');
});

app.use('/api/v1/lists', routes.list);