// @ts-nocheck
const express = require('express');  // a web application framework for node.js            
const dotenv = require('dotenv').config();  // a module to read environmental variables from '.env' file
const cors = require('cors');  // middleware to enable cross-origin resource sharing
const mongoose = require('mongoose');  // mongodb object modelling tool
const cookieParser = require('cookie-parser');  // middleware for parsing cookies in the request

const app = express();  // express app setup

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('database connected'))
.catch((error) => console.log('database not connected', error))

// middleware
app.use(express.json());  // for parsing incoming json requests
app.use(cookieParser());  // parse cookies in the request
app.use(express.urlencoded({extended: false}));  // parse incoming requests with url recoded data

app.use('/', require('./routes/authRoutes'))  // include and use the routes defined in authRoutes.js

const port = 8000
app.listen(port, () => console.log(`server is running on port ${port}`))