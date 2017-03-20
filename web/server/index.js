'use strict'

const express = require('express')

// Constants
const PORT = process.env.PORT

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n')
});

app.listen(PORT)
