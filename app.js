require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

module.exports = app;