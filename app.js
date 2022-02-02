require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use('/api/blogs/', notesRouter)
module.exports = app;