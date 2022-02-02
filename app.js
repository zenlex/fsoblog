const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')
const config = require('./utils/config')

mongoose.connect(config.MONGO_URL)

app.use(cors());
app.use(express.static('build'))
app.use(express.json());

app.use('/api/blogs/', notesRouter)
module.exports = app;