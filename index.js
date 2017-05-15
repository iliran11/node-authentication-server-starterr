const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');


//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
router(app);
// Server Setup

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})